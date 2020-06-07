import React, { useState } from 'react';
import { ArrowIcon } from './arrowIcons';
import './styles.scss';

export default class Accordion extends React.PureComponent {
  render() {
    const {items, renderAccordionItemContent, headerTitle} = this.props
    return (
      <div className="accordion">
        <h2 className="accordion--header">{headerTitle}</h2>
        {items.map((accordionItem, index) => (
          <AccordionItem {...accordionItem} {...{renderAccordionItemContent, index}} />
        ))}
      </div>
    )
  }
}

export function AccordionItem(props) {
  const [expanded, setToExpanded] = useState(false);
  const {title, renderAccordionItemContent, index} = props;

  const accordionStateClass = expanded ? 'accordion-item--expanded': 'accordion-item--collapsed';
  const arrowIconClass = expanded ? 'up': 'down';
  return (
    <div className={`accordion-item ${accordionStateClass}`}>
      <div className="accordion-item--header" onClick={() => setToExpanded(!expanded)}>
        <div className="accordion-item--header-title">{title}</div>
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
