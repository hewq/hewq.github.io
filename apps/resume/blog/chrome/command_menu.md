# Chrome 开发者工具 —— 命令行菜单（Command Menu）的使用

> 按下`Command+Shift+P`（Mac）或者`Control+Shift+P`（Windows, Linux）打开命令菜单。

## Show Rendering

- **FPS Meter**（或者 Frame Rendering Stats）, FPS 的实时数据就会显示出来。![fps-meter](/blog/chrome/images/fps-meter.png)
- **Paint flashing** 使用 **Paint flashing** 来获得页面上所有绘制事件的实时视图。每当页面的某一部分被重新绘制时，DevTools 会都会将其标记出来。

## Show Coverage

- 打开 **Coverage**，重新加载页面，**Coverage** 面板下会显示代码的使用情况。![coveragereport](/blog/chrome/images/coveragereport.png)
- 选中其中一个文件，DevTools 在 **Soucre** 面板中打开文件，左边的绿色条代表当前行代码已被执行，红色条表示当前行代码从未执行，且不需要在页面加载时使用。![jquery](/blog/chrome/images/jquery.png)

## Show Request blocking

- 打开 **Request blocking**，点击`Add pattern`或者`+`，然后输入需要阻止运行的文件，如`/libs/*`。![libs](/blog/chrome/images/libs.png)
- 重新加载页面，所匹配的文件将被阻止运行。![blocklibs](/blog/chrome/images/blockedlibs.png)
