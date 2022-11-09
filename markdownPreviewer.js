let defaultMarkdownValue = `# Here's my Markdown Previewer using React! 
***
## Here is an H2 element.         
***
### Wait!! There are more things that we can do using a markdown. Such as:
Styling a text:   
_Italic_        
**Bold**   
Or _**Both**_ 

And you can also have "\`code\`" font-face. 

A code block can be created too, using three backticks "\`\`\`" on the line above & below the code block,  
 just like the one below:  
\`\`\`  

function greeting() {
  console.log("Hello, World!");
}  

\`\`\`  

####  Can create lists of your choice, here are some types-
 
Ordered List  
1. Number One.
1. Number Two.
1. Number Three

Unordered List  
* First item.
* Second item.
* Third item.  

A blockquote:     
> **I am blockquote**. 

_Made a link here_ [FreeCodeCamp](https://www.freecodecamp.org/learn)!  

You can construct a table as well:
| Kebab-case | camelCase | PascalCase |
|:--   | :---: |   ---:| 
|first-row| firstRow | FirstRow |
|second-row| secondRow | SecondRow |
|third-row| thirdRow | ThirdRow |    
Here's a list with different identation levels as follows,    
   - Far  
      - Farther  
          - Farthest  

_**We can't forget about embedding pictures, can we?**_  
There you go..  
![Markdown Logo](https://www.imaginarycloud.com/blog/content/images/2022/03/VS--1-.jpg)`;

let reactRenderMethod = ReactDOM.render;
let convertToHtml = new markdownit();
let audioObject = new Audio("./sounds/markdownPreviewer-toggle-sound.mp3");

// some functions
let shrinkCustomScrollbarHeight = function (customScrollbar) {
  customScrollbar.style.height = "0px";
};
let addAnimationToTitle = function() {
  let titleElement = document.querySelector("#title");
  let containerOfTitleRows = document.querySelector(".title__rows-container");
  let secondRowOfTitle = document.querySelector(".title__second-row");

  titleElement.style.animationName = "changing-bg-color";
  containerOfTitleRows.style.animationName = "margin-change";
  secondRowOfTitle.style.animationName = "stretch-width";
};
let changeToggleButtonDisplay = function() {
  let toggleButtonContainer = document.querySelector(".toggle-button-container");
  toggleButtonContainer.style.display = "block";
};
let checkViewportWidth = function() {
  let windowViewportWidth = window.innerWidth;
  return windowViewportWidth;
};
let toggleButtonSound = function() {
  audioObject.play();
};

/* React.js */
class ParentContainer extends React.Component {
  constructor(props) {
    super(props);
    this.maximizeWindow = this.maximizeWindow.bind(this);
    this.edit = this.edit.bind(this);
    this.closeModalBox = this.closeModalBox.bind(this);
    this.toggleBetweenEditorAndPreviewer = this.toggleBetweenEditorAndPreviewer.bind(this);
  }

  edit(event) {
    let editPen = document.querySelector(".textarea__edit-pen");
    let textareaElement = document.querySelector("textarea");
    let totalNoOfCharactersInTextarea = textareaElement.value.length;

    if (textareaElement.readOnly === true) {
      textareaElement.readOnly = false;
      textareaElement.setSelectionRange(
        totalNoOfCharactersInTextarea,
        totalNoOfCharactersInTextarea
      ); //used for moving the cursor to the end of the editor
      textareaElement.focus();
      editPen.style.backgroundColor = "black";
      editPen.style.color = "white";
    } else {
      textareaElement.readOnly = true;
      editPen.style.backgroundColor = "white";
      editPen.style.color = "black";
    }
  }

  maximizeWindow(event) {
    let windowToMaximize = event.target.parentElement.parentElement;
    let contentHeightOfWindow = windowToMaximize.lastElementChild.scrollHeight;
    let heightOfTheWindowToMaximize = windowToMaximize.clientHeight;
    let viewportHeight = window.innerHeight;
    let seventyFivePercentOfViewportHeight = (viewportHeight / 100) * 75;
    let customScrollbarKey = document.querySelector(".custom-scrollbar__key");

    if (heightOfTheWindowToMaximize < contentHeightOfWindow) {
      windowToMaximize.style.height = `${contentHeightOfWindow}px`;
    } else {
      windowToMaximize.style.height = `${seventyFivePercentOfViewportHeight}px`;
      shrinkCustomScrollbarHeight(customScrollbarKey);
    }
  }

  closeModalBox(event) {
    let modalBoxContainer = document.querySelector(".modal-box-container");
    let modalBox = document.querySelector(".modal-box");
    let modalCloseButton = document.querySelector(
      ".modal-box-container__close-button"
    );

    modalBox.style.animationName = "shrink";
    modalCloseButton.style.animationName = "up-rotate-disappear";

    setTimeout(function () {
      modalBoxContainer.style.display = "none";
      addAnimationToTitle();

      if(checkViewportWidth() <= "768") {
        changeToggleButtonDisplay();
      }
    }, 3000);
  }

  toggleBetweenEditorAndPreviewer(event) {
    let toggleButtonSwitch = document.querySelector(".toggle-button__switch");
    let previewerOption = document.querySelector(".toggle-button__previewer-option");
    let editorOption = document.querySelector(".toggle-button__editor-option");
    let editorWindow = document.querySelector(".editor-window");
    let previewerWindow = document.querySelector(".previewer-window");
    let clickedElement = event.target;

    if(clickedElement === previewerOption) {
      toggleButtonSwitch.style.left = "50%";
      previewerOption.style.color = "#ffe511";
      previewerOption.style.textShadow = "1px 4px #000";
      editorOption.style.color = "#424242";
      editorOption.style.textShadow = "0px 0px transparent";
      editorWindow.style.transform = "scale(0.8)";
      editorWindow.style.opacity = 0;
      previewerWindow.style.transform = "translateX(0px)";
      toggleButtonSound();
    } else {
      toggleButtonSwitch.style.left = "0px";
      editorOption.style.color = "#ffe511";
      editorOption.style.textShadow = "1px 4px #000";
      previewerOption.style.color = "#424242";
      previewerOption.style.textShadow = "0px 0px transparent";
      previewerWindow.style.transform = "translateX(100vw)";
      editorWindow.style.transform = "scale(1)";
      editorWindow.style.opacity = 1;
      toggleButtonSound();
    }
  }

  componentDidMount() {
    let editor = document.querySelector(".editor");
    let previewer = document.querySelector(".previewer");

    previewer.innerHTML = convertToHtml.render(defaultMarkdownValue);

    editor.addEventListener("input", function (event) {
      previewer.innerHTML = convertToHtml.render(event.target.value);
      if (previewer.scrollHeight > previewer.clientHeight) {
        previewer.style.height = "auto";
      } else {
        previewer.style.height = "200px";
      }
    });
  }

  render() {
    return (
      <>
        <div className="editor-window">
          <div className="editor-label">
            Editor
            <i className="fa-solid fa-maximize" onClick={this.maximizeWindow}></i>
          </div>
          <div className="textarea__edit-pen">
            <i className="fa-solid fa-pen-to-square" onClick={this.edit}></i>
          </div>
          <textarea className="editor" name="text-field" rows="15" spellCheck="false" readOnly>
            {defaultMarkdownValue}
          </textarea>
        </div>
        <div className="previewer-window">
          <div className="previewer-label">
            Previewer
            <i className="fa-solid fa-maximize" onClick={this.maximizeWindow}></i>
          </div>
          <div className="previewer"></div>
        </div>
        <div className="custom-scrollbar">
          <div className="custom-scrollbar__key"></div>
        </div>
        <div className="modal-box-container">
          <div className="modal-box">
            <img className="modal-box__image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Markdown-mark.svg/2560px-Markdown-mark.svg.png" alt="markdown-logo"/>
            <p className="modal-box__greetings-text">
              Welcome to this Markdown Previewer!
            </p>
            <p className="modal-box__instruction-text">
              Here you can write/edit your own markdown text and see the results
              of it in real time.
              <br />
              <br />
              Editor is where you can write/edit your markdown and Previewer is
              where the result will be displayed.
              <br />
              <br />
              To know more about&nbsp;
              <a className="modal-box__link" href="https://www.markdownguide.org/" target="_blank">
                Markdown
              </a>
              .<br />
              <br />
              Let's get started..
            </p>
          </div>
          <button type="button" className="modal-box-container__close-button" onClick={this.closeModalBox}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="toggle-button-container">
          <div className="toggle-button-container__toggle-button toggle-button" onClick={this.toggleBetweenEditorAndPreviewer}>
            <div className="toggle-button__switch"></div>
            <p className="toggle-button__editor-option">Editor</p>
            <p className="toggle-button__previewer-option">Previewer</p>
          </div>
        </div>
      </>
    );
  }
}
reactRenderMethod(<ParentContainer />, document.getElementById("react-container"));

/* DOM manipulation for custom scroll bar. */
window.addEventListener("scroll", function (event) {
  let scrollableContentHeightOfBody =
    document.body.scrollHeight - window.innerHeight;
  let heightScrolledOfBodyContent = window.scrollY;
  let heightForCustomScrollbar =
    heightScrolledOfBodyContent / (scrollableContentHeightOfBody / 100);
  let customScrollbarKey = document.querySelector(".custom-scrollbar__key");

  if (
    window.scrollY !== 0 &&
    scrollableContentHeightOfBody > heightScrolledOfBodyContent
  ) {
    customScrollbarKey.style.height = `${heightForCustomScrollbar}vh`;
  }
});
