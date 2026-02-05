/**
 * 词汇生成模块
 * 使用本地数据库生成词汇，无需调用 API
 */

/**
 * 生成词汇（从本地数据库获取）
 * @param {string} topic - 主题
 * @returns {Promise<Array>} 词汇数组
 */
async function generateVocabulary(topic) {
    console.log(`📝 从本地数据库获取词汇，主题：${topic}`);

    // 从本地数据库获取词汇
    const vocabulary = getVocabularyFromDatabase(topic);

    console.log(`✅ 词汇获取成功，共 ${vocabulary.length} 个`);

    return vocabulary;
}

/**
 * 格式化词汇列表用于显示
 * @param {Array} vocabulary - 词汇数组
 * @returns {string} HTML 字符串
 */
function formatVocabularyList(vocabulary) {
    if (!vocabulary || vocabulary.length === 0) {
        return '<p>暂无词汇</p>';
    }

    return vocabulary.map(word => `
        <div class="vocabulary-item">
            <div class="vocabulary-pinyin">${word.pinyin}</div>
            <div class="vocabulary-hanzi">${word.hanzi}</div>
            <div class="vocabulary-category">${word.category}</div>
        </div>
    `).join('');
}

/**
 * 按分类分组词汇
 * @param {Array} vocabulary - 词汇数组
 * @returns {Object} 分组后的词汇对象
 */
function groupVocabularyByCategory(vocabulary) {
    const groups = {
        '人物': [],
        '物品': [],
        '设施': [],
        '环境': []
    };

    vocabulary.forEach(word => {
        if (groups[word.category]) {
            groups[word.category].push(word);
        }
    });

    return groups;
}

/**
 * 获取特定分类的词汇
 * @param {Array} vocabulary - 词汇数组
 * @param {Array} categories - 分类数组
 * @param {number} limit - 限制数量
 * @returns {Array} 过滤后的词汇数组
 */
function getVocabularyByCategories(vocabulary, categories, limit = null) {
    let filtered = vocabulary.filter(word => categories.includes(word.category));
    if (limit) {
        filtered = filtered.slice(0, limit);
    }
    return filtered;
}

/**
 * 验证词汇格式
 * @param {Array} vocabulary - 词汇数组
 * @returns {boolean} 是否有效
 */
function validateVocabulary(vocabulary) {
    if (!Array.isArray(vocabulary) || vocabulary.length === 0) {
        return false;
    }

    const validCategories = ['人物', '物品', '设施', '环境'];

    return vocabulary.every(word => {
        return word.pinyin &&
               word.hanzi &&
               word.category &&
               validCategories.includes(word.category);
    });
}

/**
 * 将词汇转换为文本格式（用于提示词）
 * @param {Array} vocabulary - 词汇数组
 * @returns {string} 文本字符串
 */
function vocabularyToText(vocabulary) {
    return vocabulary.map(word => `${word.pinyin} ${word.hanzi}`).join(', ');
}

/**
 * 统计各分类词汇数量
 * @param {Array} vocabulary - 词汇数组
 * @returns {Object} 统计对象
 */
function countVocabularyByCategory(vocabulary) {
    const groups = groupVocabularyByCategory(vocabulary);
    const counts = {};

    for (const category in groups) {
        counts[category] = groups[category].length;
    }

    return counts;
}
