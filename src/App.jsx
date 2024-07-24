/**
 * src/App.jsx
 */


import React, { useState } from 'react'
import { IFrame } from './IFrame'


let shown = false


export const App = () => {
  // function to identify a given element
  const getTag = element => {
    return `${element.tagName}${element.id && "#"+element.id}`
  }

  // <<< LOG STANDARD DOM BUBBLING
  // TRICK: Create a `ref` object with useState(), so that the App
  // component will re-render after the ref is set
  const [ iframeRef, setIframeRef ] = useState()
  
  // Select all the element children of body except for div#root,
  //  to add an intrinsic event handler to them
  const selector = ("body *:not(script):not(#root)")
  const elements = Array.from(document.querySelectorAll(selector))
  // Log which elements will be given an onmouseup handler
  if (iframeRef && !shown) {
    shown = true
    console.log(`onmouseup set for:
* ${elements.map(getTag).reverse().join("\n* ")}

`)
  }
  
  // Add a mouseup handler to each element
  elements.forEach( element => {
    element.onmouseup = () => (
      console.log("dom-bubbling mouseup:", getTag(element))
    )
  })
  // LOG STANDARD DOM BUBBLING >>>

  
  // <<< LOG REACT BUBBLING
  // Create a listener function which will be attached to all
  // elements in the App component tree
  const reactBubble = event => {
    const {currentTarget} = event
    console.log("react-bubble mousedown:", getTag(currentTarget))
  }
  // LOG REACT BUBBLING >>


  return (
    <div
      id="app"
      onMouseDown={reactBubble}
    >
      <p>Open the Developer Console to see the results of clicking on the buttons below.</p>
      <IFrame
        forward={setIframeRef}
        reactBubble={reactBubble}
        getTag={getTag}
      />
    </div>
  )
}