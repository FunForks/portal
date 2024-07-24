# React Portal Bubbling #

[Demo](https://funforks.github.io/portal/)

This repo demonstrates how to use `ReactDOM.createPortal()` to place a JSX component at a custom location in the DOM, and how React and the DOM treat bubbling events differently when `ReactDOM.createPortal()` is used.

As far as React is concerned, the JSX component continues to behave as if it were inside its JSX parent. As far as the DOM is concerned, it behaves as it should in its assigned location.

1. Run `npm i && npm start`
2. Open the web page in your browser
3. Open the Developer Inspector. You should see:

   ```html
     <body>
       <div id="root">
         <div id="app">
           <div id="parent-div">
             <button id="in-parent-div">
               This child is placed in the parent div
             </button>
           </div>
         </div>
       </div>

       <script type="module" src="/portal/src/main.jsx+t=1721811838808"></script>

       <button id="in-body">
         This child is placed in the document body
       </button>
   </body>
   ```
   Notice that there are two buttons, one inside BODY > DIV#root > DIV#app > DIV#parent-div, the other at the root of the body.

   Both these buttons are created in the IFrame.jsx component, but the second one is placed using `ReactDOM.createPortal()`

4. Open the Developer Console. You should see:

    ```
    onmouseup set for:
    * BUTTON#in-body
    * BUTTON#in-parent-div
    * DIV#parent-div
    * DIV#app
    ```
    The DOM will use the onmouseup handler in each of these elements to log which elements receive a `mouseup` event.

    The App.jsx and IFrame.jsx scripts also add `onMouseDown` event listeners to the same elements.

5. Click on the top button (This child is placed in the parent div) and check the output in the Console:
   ```
   react-bubble mousedown: BUTTON#in-parent-div
   react-bubble mousedown: DIV#parent-div
   react-bubble mousedown: DIV#app

   dom-bubbling mouseup:   BUTTON#in-parent-div
   dom-bubbling mouseup:   DIV#parent-div
   dom-bubbling mouseup:   DIV#app

   click parents: BODY > DIV#root > DIV#app > DIV#parent-div > BUTTON#in-parent-div
   ```
   This tells you that, for the button that is in its standard place in the IFrame component, the bubbling for both the `mousedown` and the `mouseup` events followed the same path. The DOM hierarchy and the React hierarchy are the same

6. Click on the lower button (This child is placed in the document body) and check the output in the Console:

    ```
    react-bubble mousedown: BUTTON#in-body
    react-bubble mousedown: DIV#parent-div
    react-bubble mousedown: DIV#app
    dom-bubbling mouseup:   BUTTON#in-body
    click parents: BODY > BUTTON#in-body
    ```
    This tells you that the DOM hierarchy and the React hierarchy are different. Event listeners set by React receive events is the same order as before, but the DOM only has a `mouseup` handler in the button itself.

## Why would you want to use `ReactDOM.createPortal()`?
See the [React documentation](https://react.dev/reference/react-dom/createPortal#usage) for more details.