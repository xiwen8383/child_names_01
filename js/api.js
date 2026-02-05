/**
 * API 调用封装模块
 * 包含 OpenAI API 和 Kie AI API 的调用函数
 */

// ==================== localStorage 管理 ====================

/**
 * 保存 API 密钥到 localStorage
 * @param {string} kieAIKey - Kie AI API 密钥
 */
function saveAPIKeys(kieAIKey) {
    localStorage.setItem('kie_ai_api_key', kieAIKey.trim());
    console.log('✅ API 密钥已保存到 localStorage');
}

/**
 * 从 localStorage 获取 API 密钥
 * @returns {Object} 包含 kieAI 密钥的对象
 */
function getAPIKeys() {
    return {
        kieAI: localStorage.getItem('kie_ai_api_key') || ''
    };
}

/**
 * 检查 API 密钥是否已配置
 * @returns {boolean} 是否已配置
 */
function isAPIKeysConfigured() {
    const keys = getAPIKeys();
    return keys.kieAI && keys.kieAI.length > 0;
}

/**
 * 清除 API 密钥
 */
function clearAPIKeys() {
    localStorage.removeItem('kie_ai_api_key');
    console.log('🗑️ API 密钥已清除');
}

// ==================== 工具函数 ====================

/**
 * 延迟函数
 * @param {number} ms - 延迟毫秒数
 * @returns {Promise}
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ==================== Kie AI API 调用 ====================

/**
 * 创建 Kie AI 图像生成任务
 * @param {string} prompt - 绘图提示词
 * @param {string} apiKey - Kie AI API 密钥
 * @param {Object} options - 可选参数
 * @returns {Promise<string>} 任务 ID
 */
async function createKieAITask(prompt, apiKey, options = {}) {
    console.log('🎨 正在调用 Kie AI API 创建图像生成任务');

    const {
        aspectRatio = '3:4',  // 竖版 A4 比例
        resolution = '2K',
        outputFormat = 'png'
    } = options;

    try {
        const response = await fetch('https://api.kie.ai/api/v1/jobs/createTask', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'nano-banana-pro',
                input: {
                    prompt: prompt,
                    aspect_ratio: aspectRatio,
                    resolution: resolution,
                    output_format: outputFormat
                }
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.msg || `API 错误: ${response.status}`);
        }

        const data = await response.json();
        const taskId = data.data.taskId;

        console.log(`✅ 任务创建成功，任务 ID: ${taskId}`);

        return taskId;

    } catch (error) {
        console.error('❌ Kie AI API 调用失败:', error);
        throw new Error(`图像生成任务创建失败: ${error.message}`);
    }
}

/**
 * 查询 Kie AI 任务状态
 * @param {string} taskId - 任务 ID
 * @param {string} apiKey - Kie AI API 密钥
 * @returns {Promise<Object>} 任务状态对象
 */
async function getKieAITaskStatus(taskId, apiKey) {
    try {
        const response = await fetch(`https://api.kie.ai/api/v1/jobs/recordInfo?taskId=${taskId}`, {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });

        if (!response.ok) {
            throw new Error(`API 错误: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('❌ 查询任务状态失败:', error);
        throw error;
    }
}

/**
 * 轮询 Kie AI 任务直到完成
 * @param {string} taskId - 任务 ID
 * @param {string} apiKey - Kie AI API 密钥
 * @param {Object} options - 可选参数
 * @returns {Promise<string>} 图像 URL
 */
async function pollKieAITask(taskId, apiKey, options = {}) {
    const {
        maxAttempts = 60,     // 最多轮询次数
        interval = 5000        // 轮询间隔（毫秒）
    } = options;

    console.log(`⏳ 开始轮询任务状态，最多 ${maxAttempts} 次，间隔 ${interval}ms`);

    for (let i = 0; i < maxAttempts; i++) {
        await sleep(interval);

        try {
            const status = await getKieAITaskStatus(taskId, apiKey);
            const state = status.data.state;

            console.log(`🔄 第 ${i + 1}/${maxAttempts} 次查询，状态: ${state}`);

            if (state === 'success') {
                const resultJson = JSON.parse(status.data.resultJson);
                const imageUrl = resultJson.resultUrls[0];
                console.log('✅ 图像生成成功!', imageUrl);
                return imageUrl;
            }

            if (state === 'fail') {
                const failMsg = status.data.failMsg || '未知错误';
                throw new Error(`图像生成失败: ${failMsg}`);
            }

            // state === 'waiting'，继续轮询

        } catch (error) {
            console.error(`❌ 第 ${i + 1} 次查询出错:`, error);
            if (i === maxAttempts - 1) {
                throw error;
            }
        }
    }

    throw new Error('任务超时：图像生成时间过长');
}
