# WPF核心技术学习路径

Windows Presentation Foundation (WPF) 是一种用于构建 Windows 桌面应用程序的强大框架。它提供了丰富的图形功能、数据绑定和自定义控件等特性。

# 学习路径

## 一、基础知识

### 1.1 WPF 简介

- **什么是WPF**: 了解WPF的基本概念和用途。
- **WPF的历史**: 掌握WPF的发展历程及其在应用程序开发中的地位。
- **WPF与WinForms的比较**: 学习WPF与传统WinForms的区别和优势。

### 1.2 开发环境

- **安装Visual Studio**: 安装并配置Visual Studio作为WPF开发环境。
- **创建第一个WPF应用程序**: 通过实践创建一个简单的WPF应用程序，熟悉项目结构和基本操作。

### 1.3 XAML基础

- **什么是XAML**: 学习XAML的定义和用途。
- **XAML的语法**: 掌握XAML的基本语法和使用方法。
- **XAML与代码的关系**: 了解如何在XAML和后台代码之间进行交互。

## 二、布局

### 2.1 布局容器

- **StackPanel**: 学习如何使用StackPanel进行垂直和水平布局。
- **Grid**: 掌握Grid的网格布局技术。
- **Canvas**: 了解Canvas的绝对定位布局。
- **DockPanel**: 学习DockPanel的停靠布局方式。
- **WrapPanel**: 了解WrapPanel的自动换行布局。

### 2.2 布局属性

- **Margin**: 学习如何设置控件的外边距。
- **Padding**: 掌握控件的内边距设置。
- **Alignment**: 了解控件的对齐属性。
- **Sizing**: 学习控件的大小调整和自适应技巧。

## 三、控件

### 3.1 基本控件

- **Button**: 学习Button控件的使用。
- **TextBox**: 掌握TextBox控件的基本操作。
- **Label**: 了解Label控件的用途。
- **CheckBox**: 学习CheckBox控件的用法。
- **RadioButton**: 掌握RadioButton控件的使用技巧。

### 3.2 内容控件

- **ContentControl**: 学习如何使用ContentControl容纳内容。
- **HeaderedContentControl**: 了解HeaderedContentControl的应用。

### 3.3 列表控件

- **ListBox**: 学习ListBox控件的基本操作和高级功能。
- **ComboBox**: 掌握ComboBox控件的使用技巧。
- **DataGrid**: 了解DataGrid控件的数据展示和编辑功能。

### 3.4 其他控件

- **Slider**: 学习Slider控件的用法。
- **ProgressBar**: 掌握ProgressBar控件的使用。
- **Menu**: 了解Menu控件的创建和配置。

## 四、数据绑定

### 4.1 数据绑定基础

- **数据上下文 (DataContext)**: 了解DataContext的概念和使用。
- **绑定模式 (OneWay, TwoWay, etc.)**: 学习不同的数据绑定模式及其应用场景。

### 4.2 数据模板

- **DataTemplate**: 掌握DataTemplate的定义和使用。
- **ItemTemplate**: 学习ItemTemplate的配置和应用。

### 4.3 集合绑定

- **ObservableCollection**: 了解ObservableCollection的用法。
- **ListCollectionView**: 掌握ListCollectionView的使用技巧。

### 4.4 数据验证

- **INotifyDataErrorInfo**: 学习数据验证接口。
- **ValidationRule**: 了解自定义验证规则的实现。

## 五、样式和模板

### 5.1 样式

- **基本样式**: 学习定义和应用基本样式。
- **样式继承**: 掌握样式继承的概念和应用。
- **动态资源和静态资源**: 了解资源的定义和使用。

### 5.2 控件模板

- **ControlTemplate**: 学习自定义控件模板。
- **DataTemplate**: 了解数据模板的应用。

### 5.3 触发器

- **属性触发器**: 学习基于属性的触发器。
- **数据触发器**: 了解基于数据的触发器。
- **事件触发器**: 掌握基于事件的触发器。

## 六、事件和命令

### 6.1 事件处理

- **路由事件**: 学习WPF中的路由事件。
- **直接事件**: 了解直接事件的处理。
- **冒泡事件**: 掌握冒泡事件的概念。
- **隧道路由事件**: 学习隧道路由事件的应用。

### 6.2 命令

- **ICommand接口**: 掌握ICommand接口的实现。
- **内置命令**: 了解WPF中的内置命令。
- **自定义命令**: 学习创建和使用自定义命令。

### 6.3 事件触发器

- **事件触发器的定义和使用**: 学习如何定义和使用事件触发器。

## 七、动画和图形

### 7.1 动画基础

- **时间线 (Timeline)**: 学习时间线的定义和应用。
- **关键帧 (KeyFrames)**: 掌握关键帧动画的实现。

### 7.2 动画类型

- **颜色动画**: 了解颜色动画的实现。
- **大小动画**: 学习大小动画的用法。
- **路径动画**: 掌握路径动画的应用。

### 7.3 图形绘制

- **Shape类**: 了解Shape类的使用。
- **画刷 (Brush)**: 学习画刷的定义和应用。
- **变换 (Transform)**: 掌握变换的概念和实现。

## 八、资源和样式

### 8.1 资源定义

- **静态资源**: 学习静态资源的定义和使用。
- **动态资源**: 了解动态资源的应用。

### 8.2 样式定义

- **全局样式**: 学习定义全局样式。
- **本地样式**: 掌握本地样式的使用。
- **基于类型的样式**: 了解基于类型的样式定义。
- **基于键的样式**: 学习基于键的样式应用。

## 九、高级主题

### 9.1 MVVM 模式

- **Model**: 了解Model的定义和职责。
- **View**: 学习View的实现和绑定。
- **ViewModel**: 掌握ViewModel的创建和数据绑定。

### 9.2 自定义控件

- **用户控件**: 学习创建和使用用户控件。
- **自定义控件**: 掌握自定义控件的开发和应用。

### 9.3 性能优化

- **虚拟化**: 了解虚拟化的概念和实现。
- **Lazy Loading**: 学习延迟加载的应用。

### 9.4 多媒体

- **播放视频**: 学习WPF中视频播放的实现。
- **播放音频**: 了解音频播放的应用。

### 9.5 与 Win32 互操作

- **调用Win32 API**: 学习如何在WPF中调用Win32 API。
- **使用WinForms控件**: 掌握在WPF中嵌入和使用WinForms控件。

#### 学习建议

- **实践练习**: 在学习过程中动手编写小项目或应用程序。
- **阅读官方文档和图书**: MSDN和Microsoft Learn提供了详尽的WPF文档和教程。官网地址：[learn.microsoft.com](https://learn.microsoft.com/zh-cn/dotnet/desktop/wpf/overview/?view=netdesktop-7.0)
- **参与社区**: 加入WPF开发者社区，参加论坛讨论，向其他开发者请教问题。

#### 工具和资源

- **Visual Studio**: 官方推荐的开发环境。
- **Blend for Visual Studio**: 用于设计丰富UI的工具。
- **MSDN/Docs**: 官方文档和示例代码。

><https://mp.weixin.qq.com/s/YdbBsFJGoX7RWxkOtRNiSQ>
>

## 学习路径

<img src="/images/wpf_learnpath.png"  alt="Netshare">

## 知识点概念

#### 跨线程操作与多线程

- **Dispatcher**: 用于跨线程UI操作。
- **异步编程**: 使用`async`和`await`进行异步操作。

#### 模板与逻辑树

- **控件模板**: 定义控件的外观。
- **数据模板**: 用于显示数据对象。
- **面板模板**: 定义布局和面板行为。
- **逻辑树**: UI界面的组成元素。
- **可视化树**: 逻辑树的扩展，包含更详细的元素信息。

#### 数据绑定

- **绑定源**: 绑定的数据来源。
- **绑定模式**: `OneWay`, `TwoWay`, `OneTime`, `OneWayToSource`。
- **触发绑定更新的事件**: `Default`, `Explicit`, `PropertyChange`, `LostFocus`。
- **PriorityBinding**: 绑定的优先级。

#### 触发器

- **属性触发器**: 基于属性值变化触发。
- **数据触发器**: 基于数据值变化触发。
- **事件触发器**: 基于事件触发。
- **多条件触发器**: 基于多个条件触发。

#### 样式与资源

- **Style**: 控件样式的定义。
- **Resources**: 静态资源`StaticResource`和动态资源`DynamicResource`。
- **资源字典**: 资源的集合。

#### MVVM模式

- **MVVM**: Model-View-ViewModel模式。
- **ICommand**: 命令接口，用于绑定视图和视图模型。
- **转换器**: 如`IValueConverter`，用于数据转换。

#### 元素与控件

- **Visual**: 视觉元素基类。
- **UIElement**: 用户界面元素基类。
- **FrameworkElement**: 提供布局和资源的元素基类。
- **Control**: 控件基类。

#### 自定义控件与用户控件

- **用户控件**: 将现有控件组合成新控件。
- **自定义控件**: 从头开始创建的控件。

#### 依赖属性

- **优点**: 动态类型、默认值、继承、数据绑定等。
- **定义**: 属性封装，用于WPF属性系统。
- **优先级**: 属性值的优先级。
- **继承**: 属性值的继承行为。
- **附件属性**: 可以添加到任何类型的属性。
- **验证和强制**: 属性值的验证机制。
- **监听**: 监听属性值变化。

#### 插件化开发

- **MEF**: 托管应用程序框架，用于插件化开发。
- **Prism**: 基于MVVM的框架，依赖IOC容器。

#### 资源访问

- **跨库访问资源**: 使用相对地址访问资源。

#### 渲染与事件

- **渲染**: UI的渲染过程。
- **事件路由**: 事件在元素间的传播。
- **定位资源**: 在应用程序中查找资源。

#### 数据访问

- **DataSet**, **DataCommand**, **DataAdapter**: 数据访问相关类。

#### 引用传递

- **ref**, **out**: 参数的引用传递。

#### 线程与消息

- **线程同步**, **异步**: 线程间的同步与异步操作。
- **Task**: 异步编程任务。
- **消息机制**, **消息泵**: 消息的传递和处理。

#### 继承与多态

- **abstract**, **virtual**, **new**, **override**, **sealed**: 继承和多态相关的关键字。

#### 动画与交互

- **动画**: 使用`Timeline`和`Storyboard`创建动画。
- **控件交互**: 如缩放、移动、翻转等操作。
- **弱事件**: `WeakEventManager`，用于避免内存泄漏。
- **弱引用**: `WeakReference`，用于对象的弱引用。

#### 分辨率与DPI

- **DPI**: 单位长度的像素点。
- **分辨率无关**: WPF的分辨率单位是1/96英寸。

这份整理的知识点涵盖了WPF开发中的核心技术和概念，可以作为学习和面试的参考。

> 转载整理: <https://blog.csdn.net/lwwl12/article/details/75276757>
