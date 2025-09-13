export interface Translations {
  header: {
    title: string;
  };
  modeSelector: {
    title: string;
    subtitle: string;
    textToImageDesc: string;
    imageToImageDesc: string;
    multiImageToImageDesc: string;
  };
  transformations: {
    backToSelection: string;
    backToModeSelection: string;
    chooseEffect: string;
    customPrompt: string;
    customPromptPlaceholder: string;
    multiImagePromptPlaceholder: string;
    drawMask: string;
    generateImage: string;
    generating: string;
    result: string;
    resultPlaceholder: string;
    useAsInput: string;
    uploadImage: string;
    uploadMultipleImages: string;
    textToImage: string;
    imageToImage: string;
    multiImageToImage: string;
    noImageNeeded: string;
    clickToUpload: string;
    dragAndDrop: string;
    fileFormat: string;
    imagesSelected: string;
    clearAll: string;
  };
  errors: {
    uploadImageFirst: string;
    selectEffectFirst: string;
    enterPrompt: string;
    uploadAtLeastOneImage: string;
  };
  modes: {
    textToImage: string;
    imageToImage: string;
    multiImageToImage: string;
  };
  buttons: {
    download: string;
    useAsInput: string;
    compare: string;
    preview: string;
  };
}

export const translations: Record<string, Translations> = {
  en: {
    header: {
      title: "🍌 Nano Bananary"
    },
    modeSelector: {
      title: "Choose Generation Mode",
      subtitle: "Select how you want to create your image",
      textToImageDesc: "Generate images from text descriptions",
      imageToImageDesc: "Edit and transform existing images",
      multiImageToImageDesc: "Combine multiple images into one"
    },
    transformations: {
      backToSelection: "Choose Another Effect",
      backToModeSelection: "Back to Mode Selection",
      chooseEffect: "Choose Effect",
      customPrompt: "Custom Prompt",
      customPromptPlaceholder: "e.g., 'make the sky a vibrant sunset' or 'add a small red boat on the water'",
      multiImagePromptPlaceholder: "Describe how to combine these images...",
      drawMask: "Draw Mask",
      generateImage: "Generate Image",
      generating: "Generating...",
      result: "Result",
      resultPlaceholder: "Your generated image will appear here.",
      useAsInput: "Use as Input",
      uploadImage: "Upload Image",
      uploadMultipleImages: "Upload Multiple Images",
      textToImage: "Text to Image",
      imageToImage: "Image to Image",
      multiImageToImage: "Multi-Image to Image",
      noImageNeeded: "No image upload needed for text-to-image generation",
      clickToUpload: "Click to upload or drag and drop multiple images",
      dragAndDrop: "Click to upload or drag and drop multiple images",
      fileFormat: "PNG, JPG, GIF up to 10MB each",
      imagesSelected: "image(s) selected",
      clearAll: "Clear All"
    },
    errors: {
      uploadImageFirst: "Please upload an image and select an effect first.",
      selectEffectFirst: "Please select an effect first.",
      enterPrompt: "Please enter a prompt describing the change you want to see.",
      uploadAtLeastOneImage: "Please upload at least one image."
    },
    modes: {
      textToImage: "Text to Image",
      imageToImage: "Image to Image", 
      multiImageToImage: "Multi-Image to Image"
    },
    buttons: {
      download: "Download",
      useAsInput: "Use as Input",
      compare: "Compare",
      preview: "Preview"
    }
  },
  zh: {
    header: {
      title: "🍌 香蕉超市"
    },
    modeSelector: {
      title: "选择生成模式",
      subtitle: "选择您想要的图片创建方式",
      textToImageDesc: "从文本描述生成图片",
      imageToImageDesc: "编辑和转换现有图片",
      multiImageToImageDesc: "将多张图片组合成一张"
    },
    transformations: {
      backToSelection: "选择其他效果",
      backToModeSelection: "返回模式选择",
      chooseEffect: "选择效果",
      customPrompt: "自定义提示词",
      customPromptPlaceholder: "例如：'让天空变成绚烂的日落' 或 '在水面上添加一艘小红船'",
      multiImagePromptPlaceholder: "描述如何组合这些图片...",
      drawMask: "绘制蒙版",
      generateImage: "生成图片",
      generating: "生成中...",
      result: "结果",
      resultPlaceholder: "生成的图片将在这里显示。",
      useAsInput: "用作输入",
      uploadImage: "上传图片",
      uploadMultipleImages: "上传多张图片",
      textToImage: "文生图",
      imageToImage: "图生图",
      multiImageToImage: "多图生图",
      noImageNeeded: "文生图模式无需上传图片",
      clickToUpload: "点击上传或拖拽多张图片",
      dragAndDrop: "点击上传或拖拽多张图片",
      fileFormat: "PNG、JPG、GIF 每个最大 10MB",
      imagesSelected: "张图片已选择",
      clearAll: "清除全部"
    },
    errors: {
      uploadImageFirst: "请先上传图片并选择效果。",
      selectEffectFirst: "请先选择效果。",
      enterPrompt: "请输入描述您想要的变化的提示词。",
      uploadAtLeastOneImage: "请至少上传一张图片。"
    },
    modes: {
      textToImage: "文生图",
      imageToImage: "图生图",
      multiImageToImage: "多图生图"
    },
    buttons: {
      download: "下载",
      useAsInput: "用作输入",
      compare: "对比",
      preview: "预览"
    }
  }
};