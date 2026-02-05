/**
 * 主应用逻辑
 * 处理用户交互和协调各个模块
 */

// 全局变量
let currentVocabulary = [];
let currentImageUrl = '';

// ==================== 初始化 ====================

/**
 * 页面加载完成后初始化
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 儿童识字小报生成器已加载');

    // 1. 检查 API 密钥状态
    checkAPIKeysStatus();

    // 2. 绑定事件监听器
    bindEventListeners();

    console.log('✅ 初始化完成');
});

/**
 * 绑定事件监听器
 */
function bindEventListeners() {
    // 保存 API 密钥按钮
    document.getElementById('saveKeysBtn').addEventListener('click', handleSaveAPIKeys);

    // 生成按钮
    document.getElementById('generateBtn').addEventListener('click', handleGenerate);

    // 下载按钮
    document.getElementById('downloadBtn').addEventListener('click', handleDownload);

    // 生成新的按钮
    document.getElementById('newGenerateBtn').addEventListener('click', handleNewGenerate);
}

// ==================== API 密钥管理 ====================

/**
 * 检查并更新 API 密钥状态显示
 */
function checkAPIKeysStatus() {
    const apiStatus = document.getElementById('apiStatus');
    const generateBtn = document.getElementById('generateBtn');

    if (isAPIKeysConfigured()) {
        // 已配置
        apiStatus.className = 'api-status configured';
        apiStatus.innerHTML = '<span class="status-icon">✅</span><span class="status-text">已配置</span>';
        generateBtn.disabled = false;
        console.log('✅ API 密钥已配置');
    } else {
        // 未配置
        apiStatus.className = 'api-status not-configured';
        apiStatus.innerHTML = '<span class="status-icon">⚠️</span><span class="status-text">未配置</span>';
        generateBtn.disabled = true;
        console.log('⚠️ API 密钥未配置');
    }
}

/**
 * 处理保存 API 密钥
 */
async function handleSaveAPIKeys() {
    const kieAIKey = document.getElementById('kieAIKey').value;

    if (!kieAIKey) {
        alert('❌ 请输入 API 密钥');
        return;
    }

    // 保存到 localStorage
    saveAPIKeys(kieAIKey);

    // 更新状态显示
    checkAPIKeysStatus();

    // 清空输入框
    document.getElementById('kieAIKey').value = '';

    alert('✅ API 密钥已保存！');
}

// ==================== 生成流程 ====================

/**
 * 处理生成按钮点击
 */
async function handleGenerate() {
    console.log('🎨 开始生成识字小报...');

    // 1. 获取用户输入
    const topic = document.getElementById('topicInput').value.trim();
    const title = document.getElementById('titleInput').value.trim();

    if (!topic || !title) {
        alert('❌ 请填写主题和标题');
        return;
    }

    // 2. 获取 API 密钥
    const keys = getAPIKeys();
    if (!keys.kieAI) {
        alert('❌ 请先配置 API 密钥');
        return;
    }

    try {
        // 3. 禁用按钮，防止重复点击
        setGenerateButtonState(false);

        // 4. 隐藏之前的结果
        document.getElementById('resultSection').style.display = 'none';

        // 5. 显示加载状态
        showLoading('正在生成词汇...');

        // 6. 生成词汇（从本地数据库）
        console.log(`📝 主题: ${topic}, 标题: ${title}`);
        currentVocabulary = await generateVocabulary(topic);
        console.log('✅ 词汇生成成功:', currentVocabulary);

        // 验证词汇
        if (!validateVocabulary(currentVocabulary)) {
            throw new Error('词汇格式不正确');
        }

        // 7. 生成提示词
        showLoading('正在绘制图像...');
        const prompt = generateImagePrompt(topic, title, currentVocabulary);
        console.log('📄 提示词生成完成，长度:', prompt.length);

        // 8. 调用 Kie AI 生成图像
        console.log('🎨 开始生成图像...');
        const taskId = await createKieAITask(prompt, keys.kieAI);
        console.log('✅ 任务创建成功:', taskId);

        showLoading('AI 正在绘制中，请耐心等待...');
        currentImageUrl = await pollKieAITask(taskId, keys.kieAI);
        console.log('✅ 图像生成成功:', currentImageUrl);

        // 9. 显示结果
        showResult(currentImageUrl, currentVocabulary);

    } catch (error) {
        console.error('❌ 生成失败:', error);
        alert(`❌ 生成失败: ${error.message}`);
        hideLoading();
    } finally {
        // 恢复按钮状态
        setGenerateButtonState(true);
    }
}

/**
 * 设置生成按钮状态
 * @param {boolean} enabled - 是否启用
 */
function setGenerateButtonState(enabled) {
    const generateBtn = document.getElementById('generateBtn');
    generateBtn.disabled = !enabled;
    generateBtn.textContent = enabled ? '🎨 生成识字小报' : '⏳ 生成中...';
}

// ==================== 结果展示 ====================

/**
 * 显示生成结果
 * @param {string} imageUrl - 图像 URL
 * @param {Array} vocabulary - 词汇数组
 */
function showResult(imageUrl, vocabulary) {
    // 隐藏加载状态
    hideLoading();

    // 显示图像
    document.getElementById('resultImage').src = imageUrl;
    document.getElementById('resultSection').style.display = 'block';

    // 显示词汇列表
    const vocabularyContent = document.getElementById('vocabularyContent');
    vocabularyContent.innerHTML = formatVocabularyList(vocabulary);

    // 滚动到结果区域
    document.getElementById('resultSection').scrollIntoView({ behavior: 'smooth' });

    console.log('✅ 结果展示完成');
}

/**
 * 显示加载状态
 * @param {string} text - 加载文本
 */
function showLoading(text) {
    const loadingSection = document.getElementById('loadingSection');
    const loadingText = document.getElementById('loadingText');

    loadingText.textContent = text;
    loadingSection.style.display = 'block';
}

/**
 * 隐藏加载状态
 */
function hideLoading() {
    document.getElementById('loadingSection').style.display = 'none';
}

// ==================== 下载功能 ====================

/**
 * 处理下载按钮点击
 */
async function handleDownload() {
    if (!currentImageUrl) {
        alert('❌ 没有可下载的图像');
        return;
    }

    const title = document.getElementById('titleInput').value.trim() || 'literacy-poster';
    const filename = `${title}.png`;

    try {
        await downloadImage(currentImageUrl, filename);
        console.log('✅ 下载成功:', filename);
        alert(`✅ 已下载: ${filename}`);
    } catch (error) {
        console.error('❌ 下载失败:', error);
        alert(`❌ 下载失败: ${error.message}`);
    }
}

/**
 * 下载图像
 * @param {string} imageUrl - 图像 URL
 * @param {string} filename - 文件名
 */
async function downloadImage(imageUrl, filename) {
    try {
        // 方法1：尝试使用 fetch + blob 下载（支持跨域的情况下）
        try {
            const response = await fetch(imageUrl);

            if (!response.ok) {
                throw new Error(`HTTP 错误: ${response.status}`);
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            // 创建临时链接并点击下载
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.style.display = 'none';

            document.body.appendChild(a);
            a.click();

            // 清理
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);

            console.log('✅ 使用 fetch 方法下载成功');
            return;

        } catch (fetchError) {
            console.log('⚠️ fetch 方法失败，尝试备用方案:', fetchError.message);
            // 继续尝试方法2
        }

        // 方法2：直接创建下载链接（可能在新窗口打开）
        const a = document.createElement('a');
        a.href = imageUrl;
        a.download = filename;
        a.target = '_blank';
        a.style.display = 'none';

        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);

        // 延迟提示，因为这种方法可能在新窗口打开
        setTimeout(() => {
            alert(`✅ 图片已在新窗口打开\n\n请右键点击图片并选择"图片另存为"来保存\n文件名建议：${filename}`);
        }, 500);

        console.log('✅ 使用备用方法，在新窗口打开图片');

    } catch (error) {
        console.error('❌ 下载图像失败:', error);
        throw new Error(`无法下载图片，请尝试右键点击图片并选择"图片另存为"\n错误: ${error.message}`);
    }
}

// ==================== 其他功能 ====================

/**
 * 处理生成新的按钮点击
 */
function handleNewGenerate() {
    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // 聚焦到主题输入框
    document.getElementById('topicInput').focus();
}

/**
 * 清除结果
 */
function clearResult() {
    currentVocabulary = [];
    currentImageUrl = '';
    document.getElementById('resultSection').style.display = 'none';
    document.getElementById('resultImage').src = '';
}
