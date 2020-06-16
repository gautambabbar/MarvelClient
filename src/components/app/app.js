import React from 'react';
import firebase from 'firebase/app';
import { fetchFAQAPI } from '../../api/faq';
import { queryHostNameInCurrentTab, searchHTML, highlightInHTML } from '../../helpers';
import LoadingBar from '../../../assets/images/bars.svg';
import Cancel from '../../../assets/images/cancel.svg';
import './styles.scss';
import Accordion from '../accordion';

//FAQS Data structure
/*
  "store.google.com": {
    data: [
      {
        'title': 'How to buy this product'
        'content': ''
      }
    ]
  }
*/

export const ERR_DEFAULT_MESSAGE = 'Something went wrong. Please try again later';

export default class AppComponent extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      fetchingFAQ: false,
      faqs: {},
      hostName: '',
      errorMessage: '',
      displayedFAQsList: [],
      searchText: '',
    }
    this.searchRef = React.createRef()
  }

  componentDidMount() {
    this.getFAQ()
  }

  getFAQ = async () => {
    this.setState({fetchingFAQ: true});
    const hostName = await queryHostNameInCurrentTab();
    this.setState({ hostName });
    try {
      const json = await fetchFAQAPI(hostName);
      firebase.analytics().logEvent('faq fetched', {
        hostName,
        dataExists: json.data && json.data.length > 0
      });
      const { faqs } = this.state;
      const updatedFAQs = {
        ...faqs,
        [hostName]: json.data,
      };
      this.setState({
        faqs: updatedFAQs,
        displayedFAQsList: json.data,
        fetchingFAQ: false
      });
    }

    catch (e) {
      firebase.analytics().logEvent('faq fetch error', {
        hostName,
        errorMessage: e.message
      });
      this.setState({
        fetchingFAQ: false,
        errorMessage: ERR_DEFAULT_MESSAGE
      });
    }
  }

  renderAccordionItemContent = (index) => {
    const {displayedFAQsList} = this.state;
    const item = displayedFAQsList[index];
    return (
      <div dangerouslySetInnerHTML={{__html: item.content}}></div>
      // <>
      //   <div><strong>Steps:</strong></div>
      //   <div className="numbered-list">
      //   {item.steps.map(step => (
      //       <div className="numbered-item">
      //         {step.description}
      //         {step.help_link && (
      //           <span>&nbsp;&nbsp;
      //             <a href={step.help_link} target="_blank">{step.help_link_text || "Click here"}</a>
      //           </span>
      //         )}
      //       </div>
      //     ))}
      //   </div>
      // </>
    )
  }

  renderFAQ = () => {
    const {displayedFAQsList, fetchingFAQ} = this.state;

    if(fetchingFAQ) return;
    
    const faqList = displayedFAQsList.map((item) => ({
      title: item.title
    }));

    return (
      <Accordion 
        className="faqs"
        headerTitle="FAQs"
        items={faqList} 
        renderAccordionItemContent={this.renderAccordionItemContent} 
      />
    )
  }

  searchFAQ = (e) => {
    const {target: {value}} = e;
    const {faqs, hostName} = this.state;
    const searchedFAQList = faqs[hostName].filter((item) => (searchHTML(item.title, value) || searchHTML(item.content, value)));
    const highlightedList = searchedFAQList.map((item) => ({
      title: highlightInHTML(item.title, value),//item.title.replace(value, searchHTML(item.title)),
      content: highlightInHTML(item.content, value)
    }));

    if(highlightedList.length == 0) {
      firebase.analytics().logEvent('faq search', {
        hostName,
        searchValue: value,
        results: false
      });
    }
    this.setState({
      displayedFAQsList: highlightedList,
      searchText: value
    })
  }

  clearSearch = () => {
    const {faqs, hostName} = this.state;
    this.setState({
      searchText: '',
      displayedFAQsList: faqs[hostName]
    });
    this.searchRef.current.focus();
  }

  onTextboxBlur = (e) => {
    if(e.target.value) {
      const {hostName} = this.state;
      firebase.analytics().logEvent('faq search', {
        hostName,
        searchValue: e.target.value,
        results: true
      });
    }
  }

  render() {
    const { fetchingFAQ, faqs, hostName, searchText } = this.state;
    return (
      <div className="flx flx-vertical h100 app">
        <div className="content-wrapper">
          {hostName && <div className="visited-domain" title={hostName}>You are on <strong>{hostName}</strong></div>}
          {/* <button className="btn" onClick={this.getFAQ}>FetchFaq</button> */}
          {!fetchingFAQ && faqs[hostName] && faqs[hostName].length > 0 && (
            <div className="search-wrapper flx">
              <input 
                ref={this.searchRef} 
                className="txt-box flx-auto" 
                type="text" 
                placeholder="Search FAQs" 
                onChange={this.searchFAQ} 
                value={searchText} 
                onBlur={this.onTextboxBlur}
              />
              {searchText && <img src={Cancel} className="cancel-icon" onClick={this.clearSearch} />}
            </div>
          )}
          {this.renderFAQ()}
        </div>
        {fetchingFAQ && (
          <div className="center-all flx-auto flx flx-vertical mt40">
            <img className="bar-wave-loader" src={LoadingBar} />
            <div>Loading...</div>
          </div>
        )}
      </div>
    )
  }
}