import React from 'react';
import { fetchFAQ, fetchAllFAQs } from '../api/faq';
import { queryHostNameInCurrentTab } from '../helpers';
import LoadingBar from '../../assets/images/bars.svg';

export default class AppComponent extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      fetchingFAQ: false,
      faqs: {},
      allFAQs: [],
      hostName: ''
    }
  }

  async componentDidMount() {
    const hostName = await queryHostNameInCurrentTab();
    this.setState({ hostName });
  }

  faqClick = async () => {
    this.setState({
      fetchingFAQ: true
    });

    const { faqs } = this.state;
    const hostName = await queryHostNameInCurrentTab();
    if (!hostName) {
      this.setState({ fetchingFAQ: false });
    }
    if (!faqs[hostName]) {
      const json = await fetchFAQ(hostName);
      const { faqs } = this.state;
      const updatedFAQs = {
        ...faqs,
        [hostName]: json
      };
      this.setState({
        faqs: updatedFAQs,
        hostName,
        fetchingFAQ: false
      });
      return updatedFAQs;
    }

    else {
      this.setState({ fetchingFAQ: false });
      return faqs[hostName];
    }
  }

  allFaqClick = async () => {
    this.setState({
      fetchingFAQ: true
    });

    const json = await fetchAllFAQs();
    this.setState({
      allFAQs: json,
      fetchingFAQ: false
    });
  }

  render() {
    const { fetchingFAQ, faqs, hostName, allFAQs } = this.state;
    return (
      <div className="flx flx-vertical h100 center">
        {hostName && <div>You are on {hostName}</div>}
        <div>
          <button className="btn" onClick={this.faqClick} type="button">
            Fetch FAQ
            </button>
          {hostName && (
            <pre>
              {JSON.stringify(faqs[hostName], null, 2)}
            </pre>
          )}
        </div>
        <div>
          <button className="btn" onClick={this.allFaqClick} type="button">
            Fetch All FAQs
            </button>
          <pre>
            {JSON.stringify(allFAQs, null, 2)}
          </pre>
        </div>
        {fetchingFAQ && (
          <div className="center-all flx-auto flx flx-vertical">
            <img className="bar-wave-loader" src={LoadingBar} />
            <div>We will be back soon.</div>
          </div>
        )}
      </div>
    )
  }
}