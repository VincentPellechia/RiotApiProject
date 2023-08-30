# League of Legends Stats Tracker

League of Legends Stats Tracker is a web application that allows users to track and analyze their gameplay statistics in the popular game League of Legends.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Introduction

League of Legends Stats Tracker is a platform for League of Legends players to easily retrieve and analyze their in-game statistics. Whether you're interested in win rates, champion performance, or overall progress, this app provides valuable insights to help you improve your gameplay.

## Features

- **User Authentication:** Register and log in to your account to access personalized statistics.
- **Summoner Profile:** View your summoner's information, including level, region, and rank.
- **Match History:** Browse and review your recent match history, including key stats and outcomes.
- **Champion Performance:** Analyze your performance with different champions, including win rates and average stats.
- **Rank Overview:** Check your current rank, LP, wins, and losses in ranked games.

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/league-of-legends-stats-tracker.git

## Navigate to the project directory:

cd league-of-legends-stats-tracker
## Install dependencies:

npm install
Set up environment variables:
Rename .env.example to .env and provide the necessary values.

Start the server:

npm start
Start the client:

cd client
npm start

Usage
Register or log in to your account.
Connect your League of Legends summoner account.
Explore your summoner profile, match history, and champion performance.
Gain insights from your stats to enhance your gameplay strategy.

## API Endpoints
/getUser: Retrieve user information based on region and username.
/getMatches: Get a list of match IDs associated with a summoner.
/getMatchInfo: Retrieve detailed information about a specific match.

## Technologies Used
Frontend: React, Redux, Axios
Backend: Node.js, Express, PostgreSQL
Authentication: JSON Web Tokens (JWT)
API Requests: Riot Games API

## Contributing
Contributions to League of Legends Stats Tracker are welcome! Please follow the contribution guidelines before submitting pull requests or reporting issues.