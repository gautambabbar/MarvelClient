import React, { useState } from 'react';
import { ArrowIcon } from './arrowIcons';
import './styles.scss';

export default function Accordion(props) {

  const [expandedAccordionItemState, updateExpandedState] = useState(new Array(props.items.length).fill(false));

  const setAccorionItemExpandedState = (index, state) => {
    const newState = expandedAccordionItemState.map((item, i) => i === index ? state : false);
    updateExpandedState(newState);
  }

  const { items, renderAccordionItemContent, headerTitle, className } = props
  return (
    <div className={`accordion ${className}`}>
      <h2 className="accordion--header">{headerTitle}</h2>
      {items.map((accordionItem, index) => (
        <AccordionItem 
          {...accordionItem} {...{ renderAccordionItemContent, index }} 
          onAccordionClick={setAccorionItemExpandedState} 
          expanded={expandedAccordionItemState[index]}
        />
      ))}
      {items.length == 0 && (
        <div className="accordion-no-items">No FAQ available.</div>
      )}
    </div>
  )
}

export function AccordionItem(props) {
  const { title, renderAccordionItemContent, index, onAccordionClick, expanded } = props;

  const accordionStateClass = expanded ? 'accordion-item--expanded' : 'accordion-item--collapsed';
  const arrowIconClass = expanded ? 'up' : 'down';
  return (
    <div className={`accordion-item ${accordionStateClass}`}>
      <div className="accordion-item--header" onClick={() => onAccordionClick(index, !expanded)}>
        <div className="accordion-item--header-title" dangerouslySetInnerHTML={{ __html: title }}></div>
        <span className={`arrow-icon ${arrowIconClass}`}>
          <ArrowIcon />
        </span>
      </div>
      {expanded && (
        <div className="accordion-item--content">{renderAccordionItemContent(index)}</div>
      )}
    </div>
  )
}
