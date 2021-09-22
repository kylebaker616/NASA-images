import React, { Component, Fragment } from 'react'
import { apiKey, apiUrl } from './apiConfig'
// import Nav from './components/Nav'
import axios from 'axios'
import './index.css'
// const apiKey = process.env.REACT_APP_NASA_KEY


class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      photo: {},
      liked: false,
    }
  }


  componentDidMount () {
	    const getPhoto = () => {
			return axios({
				url: apiUrl + apiKey,
				method: 'GET',
			})
		}
		getPhoto()
		  .then((res) => {
			  console.log(res)
			  this.setState({ photo: res.data})})
		console.log(this.state.photo, 'aa')
	}
	handleClick = (event) => {
		event.preventDefault()
		const { liked } = this.state
		this.setState({
			liked: !liked
		})
	}

  render () {
     let buttonJsx
	 if (!this.state.liked) {
		 buttonJsx = (
				<button className='disliked' onClick={this.handleClick}>
					<strong>like</strong>
				</button>
			)
	 } else {
		 buttonJsx = (
				<button className='liked' onClick={this.handleClick}>
					<strong>dislike</strong>
				</button>
			)
	 }
     if (this.state.photo === {}) return <div>Loading...</div>
    return (
			<Fragment>
				<div className='nasa-photo'>
					{this.state.photo.media_type === 'image' ? (
						<img
							src={this.state.photo.url}
							alt={this.state.photo.title}
							className='photo'
						/>
					) : (
						<iframe
							title='space-video'
							src={this.state.photo.url}
							frameBorder='0'
							gesture='media'
							allow='encrypted-media'
							allowFullScreen
							className='photo'
						/>
					)}
					<div>
						
						<h1>{this.state.photo.title}</h1>
						<p className='date'>{this.state.photo.date}</p>
						<p className='explanation'>{this.state.photo.explanation}</p>
					</div>
					{buttonJsx}
				</div>
			</Fragment>
		)
  }
}

export default App
