import axios from 'axios';
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TwitterShareButton, TwitterIcon } from 'react-share';
import { Container, Row, Col, Button, Table, Form, Card } from 'react-bootstrap';

const API_URL = 'http://fushinsha.auri.ga/api/genText';

export default class App extends Component {
  // 初期値を設定
  constructor(props) {
    super(props);
    this.state = {
      api_data: [],
      twitter_link: []
    };
  }

  /**
   * APIを実行する
   */
  handleTestCallApi() {
    axios
      .get(API_URL)
      .then((results) => {
        const data = results.data; // APIレスポンスを取得する
        this.setState({
          api_data: data,
          mastoshare_link: "https://mastoshare.net/post.php?text=" + data.message + " %23不審者ジェネレーター"
        });
      },
      )
      .catch((error) => {
        if (error.response) {
          // 200系以外の時にエラーが発生する
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          // 上記以外のエラーが発生した場合
          console.log('Error', error.message);
        }
      });
  }

  render() {
    return (
      <div className="app">
        <Container>
          <h1>不審者情報ジェネレーター</h1>
          <div className="mb2">
            <a href="http://fushinsha-joho.co.jp/">日本不審者情報センター</a>から得た不審者情報を元に、架空の不審者情報を生成します。
          </div>        
          <br />
          <Card className="text-center">
          <Card.Header>不審者ジェネレーター</Card.Header>
            <Card.Body>
              <Card.Title>生成結果</Card.Title>
              <Card.Text style={{ whiteSpace: 'pre-line' }}>
                {this.state.api_data['message']}
              </Card.Text>
              <div className="mb-2">
              <Button variant="success" onClick={() => this.handleTestCallApi()}>不審者を生成する</Button>
              </div>
              <TwitterShareButton url={["https://auri.ga/fushinsha/"]} hashtags={["不審者ジェネレーター"]} title={[this.state.api_data['message']]}>
              <Button variant="info">Twitterにシェア</Button>
              </TwitterShareButton>{' '}
              <a  href={this.state.mastoshare_link}><Button>Mastodonにシェア</Button></a>{' '}
            </Card.Body>
          </Card>
          <div className="text-center mt-3">
          <h3>20分間隔で投稿するBot</h3>
          <iframe allowfullscreen sandbox="allow-top-navigation allow-scripts" width="800" height="500" src="https://www.mastofeed.com/apiv2/feed?userurl=https%3A%2F%2Fap.ketsuben.red%2Fusers%2Fmecha_fushinsha_bot&theme=light&size=100&header=true&replies=false&boosts=false"></iframe>
          </div>
        </Container>
      </div>
    );
  }
}
