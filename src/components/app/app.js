import React from 'react';
import { fetchFAQAPI } from '../../api/faq';
import { queryHostNameInCurrentTab } from '../../helpers';
import LoadingBar from '../../../assets/images/bars.svg';
import './styles.scss';
import Accordion from '../accordion';

//FAQS Data structure
/*
  "store.google.com": {
    data: [
      {
        'title': 'How to buy this product'
        'steps': [
          {
            description: 'Go to this page',
            help_link: 'https://store.google.com/help', // optional
            help_link_text: 'Click to know more details' // optional
          }
        ]
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
      errorMessage: ''
    }
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
      const { faqs } = this.state;
      const updatedFAQs = {
        ...faqs,
        [hostName]: json
      };
      this.setState({
        faqs: updatedFAQs,
        fetchingFAQ: false
      });
    }

    catch (e) {
      this.setState({
        fetchingFAQ: false,
        errorMessage: ERR_DEFAULT_MESSAGE
      });
    }
  }

  renderAccordionItemContent = (index) => {
    const {faqs, hostName} = this.state;
    const item = faqs[hostName].data[index];
    return (
      <>
        <div><strong>Steps:</strong></div>
        <div className="numbered-list">
        {item.steps.map(step => (
            <div className="numbered-item">
              {step.description}
              {step.help_link && (
                <span>&nbsp;&nbsp;
                  <a href={step.help_link} target="_blank">{step.help_link_text || "Click here"}</a>
                </span>
              )}
            </div>
          ))}
        </div>
      </>
    )
  }

  renderFAQ = () => {
    const {faqs, hostName} = this.state;
    if (!faqs[hostName]) return;
    const faqList = faqs[hostName].data.map((item) => ({
      title: item.title
    }));

    return (
      <Accordion 
        headerTitle="FAQs"
        items={faqList} 
        renderAccordionItemContent={this.renderAccordionItemContent} 
      />
    )
  }

  render() {
    const { fetchingFAQ, hostName } = this.state;
    return (
      <div className="flx flx-vertical h100 app">
        <div className="content-wrapper">
          {hostName && <div>You are on <strong>{hostName}</strong></div>}
          {/* <button className="btn" onClick={this.getFAQ}>FetchFaq</button> */}
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