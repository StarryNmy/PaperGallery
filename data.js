/**
 * data.js
 * ------------------------------------------------------------
 * 网站的全部内容数据都放在这个文件里。
 * 以后新增论文，只需要在 papersData 数组里新增一个对象即可，
 * 不需要改动 app.js 里的任何 UI 代码。
 * ------------------------------------------------------------
 */

// 站点基础信息：站点名称 / 副标题 / 作者信息 / 外部链接
// 改这里就能快速定制成你自己的主页
const siteConfig = {
  siteName: "Paper Gallery",
  siteNameSub: "研究文献集", // 展示在 Logo 下方的小字
  heroTitle: "Research Papers",
  heroSubtitle:
    "It includes papers and projects in the fields of computer vision, scene generation, and city planning, organized by topic.",
  author: "Your Name",
  authorBio:
    "As a student in computer vision and human-computer interaction, this is a record of the work I have read, done, and found worth reviewing.",
  githubUrl: "https://github.com/StarryNmy", // 替换成你的 GitHub 主页
  contactEmail: "nauy9260@gmail.com", // 替换成你的邮箱
};

// 顶部筛选标签：第一个「全部」用于重置筛选，其余为固定分类
// 卡片的 tags 数组只要包含其中某一项，点击对应标签时就会显示该卡片
const filterTags = ["All", "CVPR", "NeurIPS", "arXiv", "OpenSource"];

/**
 * 论文 / 项目数据
 * 字段说明：
 *  id          唯一标识
 *  title       论文标题（保持英文原名更贴近学术习惯）
 *  abstract    一句话中文摘要，方便快速浏览
 *  tags        标签数组，第一个建议放会议/来源标签，其余为主题标签
 *  imageUrl    封面图地址；留空 "" 时会自动生成一张风格统一的占位图
 *  paperUrl    点击卡片后跳转的链接（论文页 / 项目主页 / 代码仓库）
 *  venue       来源角标，例如 "CVPR 2024"、"arXiv 2024"
 *
 * 下面 6 条为示例数据，标题与摘要均为占位内容，
 * 部署前请替换为你自己真实收藏的论文。
 */
const papersData = [
  {
    id: "p1",
    title: "Text-Driven 3D Indoor Scene Synthesis in Non-Manhattan Environments",
    abstract:
      "非曼哈顿环境下，文本驱动的室内场景生成",
    tags: ["arXiv", "场景生成"],
    imageUrl: "./assets/SpgLayout.png",
    paperUrl: "https://arxiv.org/abs/2607.02407",
    venue: "2026",
  },
  {
    id: "p2",
    title: "SceneFrom3D: Geometry-Conditioned Outdoor 3D Scene Generation via View Scheduling with Object-Level Control",
    abstract:
      "通过视图调度和对象级别的几何模型控制完成室外3D场景生成。",
    tags: ["arXiv", "场景生成", "OpenSource"],
    imageUrl: "./assets/SceneFrom3D.png",
    paperUrl: "https://kimgeonung.github.io/SceneFrom3D/",
    venue: "2026",
  },
  {
    id: "p3",
    title: "ShellMaker: Language-Guided Exterior Completion under Structural Constraints",
    abstract:
      "语言引导的外部补全框架，在给定的建筑框架等结构约束条件下，结合多种方式，生成一个使用PBR材质的完整外部网格。",
    tags: ["ECCV", "模型生成"],
    imageUrl: "./assets/ShellMaker.png",
    paperUrl: "https://ruiqixu37.github.io/ShellMaker_web/",
    venue: "ECCV 2026",
  },
  {
    id: "p4",
    title: "InSpace: Structure-Aware 3D Indoor Scene Generation from a Single 360° Image",
    abstract:
      "单张ERP 360°图像，结构感知的3D室内场景生成",
    tags: ["ECCV", "场景生成"],
    imageUrl: "./assets/InSpace.png",
    paperUrl: "https://kookie12.github.io/InSpace-Project-Page/",
    venue: "ECCV 2026",
  },
  {
    id: "p5",
    title: "NaLA: A 3D Native LLM Layout Agent for High-quality 3D Scene Generation",
    abstract:
      "一个原生3D LLM布局代理，通过在场景中放置3D模型来生成高质量的3D室内场景",
    tags: ["ECCV", "场景生成", "开源项目"],
    imageUrl: "./assets/NaLA.png",
    paperUrl: "https://adamcwan.github.io/NaLA/",
    venue: "ECCV 2026",
  },
  {
    id: "p6",
    title: "PIXELRAG: Web Screenshots Beat Text for Retrieval-Augmented Generation",
    abstract:
      "识别网页截图比直接获取网页中的文本用于RAG，更能增强LLM的表现能力",
    tags: ["arXiv", "LLM", "开源项目"],
    imageUrl: "./assets/PIXELRAG.png",
    paperUrl: "https://github.com/StarTrail-org/PixelRAG",
    venue: "GitHub",
  },
  {
    id: "p7",
    title: "ReScene: Structured Indoor Scene Reconstruction from Multi-View Captures",
    abstract:
      "多视角图像用于有序的室内场景重建",
    tags: ["arXiv", "场景生成"],
    imageUrl: "./assets/ReScene.png",
    paperUrl: "https://arxiv.org/abs/2606.28060",
    venue: "arXiv",
  },
];
