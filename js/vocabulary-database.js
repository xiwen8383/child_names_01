/**
 * 本地词汇数据库
 * 预定义常见场景的词汇，无需调用 OpenAI API
 */

const vocabularyDatabase = {
    "超市": {
        "人物": [
            { pinyin: "shōu yín yuán", hanzi: "收银员", category: "人物" },
            { pinyin: "lǐ huò yuán", hanzi: "理货员", category: "人物" },
            { pinyin: "bǎo ān", hanzi: "保安", category: "人物" },
            { pinyin: "gù kè", hanzi: "顾客", category: "人物" },
            { pinyin: "xiǎo tōu", hanzi: "小偷", category: "人物" }
        ],
        "物品": [
            { pinyin: "píng guǒ", hanzi: "苹果", category: "物品" },
            { pinyin: "xiāng jiāo", hanzi: "香蕉", category: "物品" },
            { pinyin: "niú nǎi", hanzi: "牛奶", category: "物品" },
            { pinyin: "miàn bāo", hanzi: "面包", category: "物品" },
            { pinyin: "tuī chē", hanzi: "推车", category: "物品" },
            { pinyin: "gòu wù dài", hanzi: "购物袋", category: "物品" },
            { pinyin: "shuǐ guǒ", hanzi: "水果", category: "物品" },
            { pinyin: "shū cài", hanzi: "蔬菜", category: "物品" },
            { pinyin: "diàn xùn", hanzi: "电子", category: "物品" },
            { pinyin: "wán jù", hanzi: "玩具", category: "物品" }
        ],
        "设施": [
            { pinyin: "huò jià", hanzi: "货架", category: "设施" },
            { pinyin: "shōu yín tái", hanzi: "收银台", category: "设施" },
            { pinyin: "bīng xiāng", hanzi: "冰箱", category: "设施" },
            { pinyin: "chū kǒu", hanzi: "出口", category: "设施" },
            { pinyin: "rù kǒu", hanzi: "入口", category: "设施" },
            { pinyin: "cùn bāo guì", hanzi: "存包柜", category: "设施" }
        ],
        "环境": [
            { pinyin: "dēng", hanzi: "灯", category: "环境" },
            { pinyin: "qiáng", hanzi: "墙", category: "环境" },
            { pinyin: "dì bǎn", hanzi: "地板", category: "环境" },
            { pinyin: "zhǐ shì pái", hanzi: "指示牌", category: "环境" },
            { pinyin: "tiān huā bǎn", hanzi: "天花板", category: "环境" }
        ]
    },

    "医院": {
        "人物": [
            { pinyin: "yī shēng", hanzi: "医生", category: "人物" },
            { pinyin: "hù shi", hanzi: "护士", category: "人物" },
            { pinyin: "bìng rén", hanzi: "病人", category: "人物" },
            { pinyin: "yào jì shī", hanzi: "药剂师", category: "人物" },
            { pinyin: "jiā zhǎng", hanzi: "家长", category: "人物" }
        ],
        "物品": [
            { pinyin: "tǐ wēn jì", hanzi: "体温计", category: "物品" },
            { pinyin: "yào", hanzi: "药", category: "物品" },
            { pinyin: "yìng zi", hanzi: "椅子", category: "物品" },
            { pinyin: "chuáng", hanzi: "床", category: "物品" },
            { pinyin: "zhēn tóu", hanzi: "针头", category: "物品" },
            { pinyin: "mián qiú", hanzi: "棉球", category: "物品" },
            { pinyin: "yào píng", hanzi: "药瓶", category: "物品" },
            { pinyin: "shǒu shù dāo", hanzi: "手术刀", category: "物品" },
            { pinyin: "tīng zhěn qì", hanzi: "听诊器", category: "物品" }
        ],
        "设施": [
            { pinyin: "zhěn suǒ", hanzi: "诊所", category: "设施" },
            { pinyin: "guà hào chuāng", hanzi: "挂号窗", category: "设施" },
            { pinyin: "yào fáng", hanzi: "药房", category: "设施" },
            { pinyin: "jí jiù shì", hanzi: "急救室", category: "设施" },
            { pinyin: "bìng fáng", hanzi: "病房", category: "设施" },
            { pinyin: "děng hòu qū", hanzi: "等待区", category: "设施" }
        ],
        "环境": [
            { pinyin: "bái dēng", hanzi: "白灯", category: "环境" },
            { pinyin: "bái qiáng", hanzi: "白墙", category: "环境" },
            { pinyin: "zǒu láng", hanzi: "走廊", category: "环境" },
            { pinyin: "chuāng hu", hanzi: "窗户", category: "环境" },
            { pinyin: "mén", hanzi: "门", category: "环境" }
        ]
    },

    "公园": {
        "人物": [
            { pinyin: "lǎo rén", hanzi: "老人", category: "人物" },
            { pinyin: "xiǎo hái", hanzi: "小孩", category: "人物" },
            { pinyin: "jiāo jǐng", hanzi: "交警", category: "人物" },
            { pinyin: "mài yì", hanzi: "艺", category: "人物" },
            { pinyin: "jiān shēn jiào liàn", hanzi: "健身教练", category: "人物" }
        ],
        "物品": [
            { pinyin: "huā", hanzi: "花", category: "物品" },
            { pinyin: "shù", hanzi: "树", category: "物品" },
            { pinyin: "niǎo", hanzi: "鸟", category: "物品" },
            { pinyin: "qiú", hanzi: "球", category: "物品" },
            { pinyin: "fēng zheng", hanzi: "风筝", category: "物品" },
            { pinyin: "dān gàng", hanzi: "单杠", category: "物品" },
            { pinyin: "qiū qiān", hanzi: "秋千", category: "物品" },
            { pinyin: "huá tǐ", hanzi: "滑梯", category: "物品" }
        ],
        "设施": [
            { pinyin: "cháng yǐ", hanzi: "长椅", category: "设施" },
            { pinyin: "wū hǔ", hanzi: "喷泉", category: "设施" },
            { pinyin: "xiǎo jīng", hanzi: "小径", category: "设施" },
            { pinyin: "huá tǐ", hanzi: "滑梯", category: "设施" },
            { pinyin: "qiāo qiāo bǎn", hanzi: "跷跷板", category: "设施" },
            { pinyin: "shā zi chí", hanzi: "沙子池", category: "设施" }
        ],
        "环境": [
            { pinyin: "cǎo", hanzi: "草", category: "环境" },
            { pinyin: "lù dēng", hanzi: "路灯", category: "环境" },
            { pinyin: "lán tiān", hanzi: "蓝天", category: "环境" },
            { pinyin: "bái yún", hanzi: "白云", category: "环境" },
            { pinyin: "tài yáng", hanzi: "太阳", category: "环境" }
        ]
    },

    "学校": {
        "人物": [
            { pinyin: "lǎo shī", hanzi: "老师", category: "人物" },
            { pinyin: "xué shēng", hanzi: "学生", category: "人物" },
            { pinyin: "xiào zhǎng", hanzi: "校长", category: "人物" },
            { pinyin: "bāo zǎo yuán", hanzi: "保洁员", category: "人物" },
            { pinyin: "jiā zhǎng", hanzi: "家长", category: "人物" }
        ],
        "物品": [
            { pinyin: "shū bāo", hanzi: "书包", category: "物品" },
            { pinyin: "bǐ", hanzi: "笔", category: "物品" },
            { pinyin: "běn zi", hanzi: "本子", category: "物品" },
            { pinyin: "shū", hanzi: "书", category: "物品" },
            { pinyin: "zhuō zi", hanzi: "桌子", category: "物品" },
            { pinyin: "yǐ zi", hanzi: "椅子", category: "物品" },
            { pinyin: "hēi bǎn", hanzi: "黑板", category: "物品" },
            { pinyin: "fěn bǐ", hanzi: "粉笔", category: "物品" },
            { pinyin: "jiǎng tái", hanzi: "讲台", category: "物品" }
        ],
        "设施": [
            { pinyin: "jiào shì", hanzi: "教室", category: "设施" },
            { pinyin: "tú shū guǎn", hanzi: "图书馆", category: "设施" },
            { pinyin: "cāo chǎng", hanzi: "操场", category: "设施" },
            { pinyin: "shí táng", hanzi: "食堂", category: "设施" },
            { pinyin: "wèi shēng jiān", hanzi: "卫生间", category: "设施" },
            { pinyin: "xiào mén", hanzi: "校门", category: "设施" }
        ],
        "环境": [
            { pinyin: "bǐn bǎn", hanzi: "黑板", category: "环境" },
            { pinyin: "qiáng bào", hanzi: "墙报", category: "环境" },
            { pinyin: "chuāng lián", hanzi: "窗帘", category: "环境" },
            { pinyin: "dēng guāng", hanzi: "灯光", category: "环境" },
            { pinyin: "dì bǎn", hanzi: "地板", category: "环境" }
        ]
    },

    "动物园": {
        "人物": [
            { pinyin: "sì yǎng yuán", hanzi: "饲养员", category: "人物" },
            { pinyin: "yóu kè", hanzi: "游客", category: "人物" },
            { pinyin: "xiǎo péng yǒu", hanzi: "小朋友", category: "人物" },
            { pinyin: "xiàng dǎo", hanzi: "向导", category: "人物" },
            { pinyin: "mài piào yuán", hanzi: "售票员", category: "人物" }
        ],
        "物品": [
            { pinyin: "lǎo hǔ", hanzi: "老虎", category: "物品" },
            { pinyin: "shī zi", hanzi: "狮子", category: "物品" },
            { pinyin: "dà xiàng", hanzi: "大象", category: "物品" },
            { pinyin: "cháng jǐng lù", hanzi: "长颈鹿", category: "物品" },
            { pinyin: "hóu zi", hanzi: "猴子", category: "物品" },
            { pinyin: "niǎo", hanzi: "鸟", category: "物品" },
            { pinyin: "yú", hanzi: "鱼", category: "物品" },
            { pinyin: "shé", hanzi: "蛇", category: "物品" },
            { pinyin: "kǒng què", hanzi: "孔雀", category: "物品" }
        ],
        "设施": [
            { pinyin: "lóng zi", hanzi: "笼子", category: "设施" },
            { pinyin: "shuǐ chí", hanzi: "水池", category: "设施" },
            { pinyin: "bǎo lán", hanzi: "护栏", category: "设施" },
            { pinyin: "zhǐ shì pái", hanzi: "指示牌", category: "设施" },
            { pinyin: "xiū xi cháng", hanzi: "休息长", category: "设施" },
            { pinyin: "mài piào chuāng", hanzi: "售票窗", category: "设施" }
        ],
        "环境": [
            { pinyin: "shù mù", hanzi: "树木", category: "环境" },
            { pinyin: "cǎo dì", hanzi: "草地", category: "环境" },
            { pinyin: "lu xian", hanzi: "路线", category: "环境" },
            { pinyin: "shān", hanzi: "山", category: "环境" },
            { pinyin: "shuǐ", hanzi: "水", category: "环境" }
        ]
    },

    "图书馆": {
        "人物": [
            { pinyin: "tú shū guǎn lǐ yuán", hanzi: "图书馆理员", category: "人物" },
            { pinyin: "dú zhě", hanzi: "读者", category: "人物" },
            { pinyin: "xué sheng", hanzi: "学生", category: "人物" },
            { pinyin: "jiào shòu", hanzi: "教授", category: "人物" },
            { pinyin: "bāo ān", hanzi: "保安", category: "人物" }
        ],
        "物品": [
            { pinyin: "shū", hanzi: "书", category: "物品" },
            { pinyin: "bào zhì", hanzi: "报纸", category: "物品" },
            { pinyin: "qì kān", hanzi: "期刊", category: "物品" },
            { pinyin: "bǐ jì běn", hanzi: "笔记本", category: "物品" },
            { pinyin: "diàn nǎo", hanzi: "电脑", category: "物品" },
            { pinyin: "yín dǎo pán", hanzi: "光盘", category: "物品" },
            { pinyin: "yìn shuā jī", hanzi: "印刷机", category: "物品" },
            { pinyin: "suǒ", hanzi: "锁", category: "物品" }
        ],
        "设施": [
            { pinyin: "shū jià", hanzi: "书架", category: "设施" },
            { pinyin: "yue lǎn shì", hanzi: "阅览室", category: "设施" },
            { pinyin: "jiè yuǎn tái", hanzi: "借阅台", category: "设施" },
            { pinyin: "cì kǎ jī", hanzi: "刷卡机", category: "设施" },
            { pinyin: "xǐ wén dēng", hanzi: "洗纹灯", category: "设施" },
            { pinyin: "xiū xì qū", hanzi: "休息区", category: "设施" }
        ],
        "环境": [
            { pinyin: "ān jìng", hanzi: "安静", category: "环境" },
            { pinyin: "dēng", hanzi: "灯", category: "环境" },
            { pinyin: "zhuō zi", hanzi: "桌子", category: "环境" },
            { pinyin: "yǐ zi", hanzi: "椅子", category: "环境" },
            { pinyin: "bō li", hanzi: "玻璃", category: "环境" }
        ]
    }
};

/**
 * 从本地数据库获取词汇
 * @param {string} topic - 主题
 * @returns {Array} 词汇数组
 */
function getVocabularyFromDatabase(topic) {
    // 精确匹配
    if (vocabularyDatabase[topic]) {
        const data = vocabularyDatabase[topic];
        let allVocabulary = [];

        // 合并所有分类的词汇
        for (const category in data) {
            allVocabulary = allVocabulary.concat(data[category]);
        }

        console.log(`✅ 从本地数据库加载词汇: ${topic}, 共 ${allVocabulary.length} 个`);
        return allVocabulary;
    }

    // 模糊匹配
    const keys = Object.keys(vocabularyDatabase);
    for (const key of keys) {
        if (topic.includes(key) || key.includes(topic)) {
            const data = vocabularyDatabase[key];
            let allVocabulary = [];

            for (const category in data) {
                allVocabulary = allVocabulary.concat(data[category]);
            }

            console.log(`✅ 模糊匹配词汇: ${topic} -> ${key}, 共 ${allVocabulary.length} 个`);
            return allVocabulary;
        }
    }

    // 未找到，返回默认通用词汇
    console.log(`⚠️ 未找到 "${topic}" 的词汇，使用默认词汇`);
    return getDefaultVocabulary();
}

/**
 * 获取默认通用词汇
 * @returns {Array} 默认词汇数组
 */
function getDefaultVocabulary() {
    return [
        { pinyin: "rén", hanzi: "人", category: "人物" },
        { pinyin: "hái zi", hanzi: "孩子", category: "人物" },
        { pinyin: "jiā zhǎng", hanzi: "家长", category: "人物" },
        { pinyin: "zhuō zi", hanzi: "桌子", category: "设施" },
        { pinyin: "yǐ zi", hanzi: "椅子", category: "设施" },
        { pinyin: "dēng", hanzi: "灯", category: "环境" },
        { pinyin: "qiáng", hanzi: "墙", category: "环境" },
        { pinyin: "dì bǎn", hanzi: "地板", category: "环境" },
        { pinyin: "shū", hanzi: "书", category: "物品" },
        { pinyin: "bǐ", hanzi: "笔", category: "物品" },
        { pinyin: "běn zi", hanzi: "本子", category: "物品" },
        { pinyin: "bāo", hanzi: "包", category: "物品" },
        { pinyin: "chuāng hu", hanzi: "窗户", category: "环境" },
        { pinyin: "mén", hanzi: "门", category: "设施" },
        { pinyin: "tiān huā bǎn", hanzi: "天花板", category: "环境" }
    ];
}

/**
 * 获取所有支持的主题
 * @returns {Array} 主题数组
 */
function getSupportedTopics() {
    return Object.keys(vocabularyDatabase);
}
