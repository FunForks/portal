/**
 * src/components/Portal.jsx
 */


import React from 'react'
import { createPortal } from 'react-dom';


export const Portal = ({ forward, reactBubble, getTag }) => {
  // Log the element that was clicked and all its parents, as
  // reported by the DOM, up as far as document.body. (There is
  // no need to include HTML and DOCUMENT)
  const logParents = ({ target }) => {
    const parents = []

    while (target) {
      parents.unshift(getTag(target))

      if (target.tagName === "BODY") {
        break
      }

      target = target.parentNode
    }
        
    console.log("click parents:", parents.join(" > ") + `
    `);
  }

  // Create a paragraph and use createPortal() to place it
  // directly into the body of the document (outside div#root,
  // outside the App component tree)
  const portal = createPortal(
    <button id="in-body"
      onMouseDown={reactBubble}
    >
      This child is placed in the document body
    </button>,
    document.body
  )

  // Create one paragraph in it expected place in the React
  // component hierarchy, and one in the portal
  return (
    <div id="parent-div"
      onMouseDown={reactBubble}
      onClick={logParents}
      ref={forward}
    >
      <button
        id="in-parent-div"
        onMouseDown={reactBubble}
      >
        This child is placed in the parent div
      </button>

      {portal}
    </div>
  )
}