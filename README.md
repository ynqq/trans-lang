# trans-lang

- 一款使用百度翻译来快速翻译中英文的插件
- 快捷键 alt+w 转换中英文
- 快捷键 alt+q 转换中英文 如果是中文转换英文自动转换为小驼峰 
- 配置文件 1(优先级最高) trans.config.json
  ```json
  {
    "APPID": "xxx",
    "KEY": "aaa",
    "maxTrans": "单次转换最大长度 默认100"
  }
  ```
- 配置文件 2 settings.json
  ```json
  {
    "trans-lang": {
      "APPID": "xxx",
      "KEY": "aa",
      "maxTrans": 100
    }
  }
  ```

# 其他信息

- 需要自己申请 appid 百度翻译开发平台地址(https://fanyi-api.baidu.com/)

# 更新日志

### 2023/12/19 0.0.4

- A 增加自动转换小驼峰的功能
- F 选中文字为空时不进行转换

### 2023/12/19 0.0.3

- U 优化配置逻辑

### 2023/12/19 0.0.2

- U 修改 README.md
- U 增加图标

### 2023/12/19 0.0.1

开发翻译功能
