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

// some functions
let shrinkCustomScrollbarHeight = function (customScrollbar) {
  customScrollbar.style.height = "0px";
};
let addAnimationToTitle = function (titleElement) {
  let containerOfTitleRows = document.querySelector(".title__rows-container");
  let secondRowOfTitle = document.querySelector(".title__second-row");

  titleElement.style.animationName = "changing-bg-color";
  containerOfTitleRows.style.animationName = "margin-change";
  secondRowOfTitle.style.animationName = "stretch-width";
};

/* React.js */
class ParentContainer extends React.Component {
  constructor(props) {
    super(props);
    this.maximizeWindow = this.maximizeWindow.bind(this);
    this.edit = this.edit.bind(this);
    this.closeModalBox = this.closeModalBox.bind(this);
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
      let titleElement = document.querySelector("#title");

      addAnimationToTitle(titleElement);
      modalBoxContainer.style.display = "none";
    }, 3000);
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
  console.log(event);
  if (
    window.scrollY !== 0 &&
    scrollableContentHeightOfBody > heightScrolledOfBodyContent
  ) {
    customScrollbarKey.style.height = `${heightForCustomScrollbar}vh`;
  }
});
