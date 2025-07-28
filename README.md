
<table>
	<thead>
    	<tr>
      		<th style="text-align:center">English</th>
      		<th style="text-align:center"><a href="README_ja.md">日本語</a></th>
    	</tr>
  	</thead>
</table>

## Overview
### Application Name: "Fun 4-Choice Quiz"
### Application URL: <https://www.takahiro-hasegawa.net/>
**Fun 4-Choice Quiz** is a simple quiz application.  
Users can enter their name to start a quiz, choose from multiple quiz genres, and enjoy playing.After the quiz ends, the number of correct answers is displayed, and users can return to the home screen to play again as many times as they like.

## Technical Stack
- **Frontend**:
    -  Framework: React
    -  styling: CSS
- **Backend**: 
    - Not implemented
- **Infrastructure**:   
The following services are managed as IaaS (Infrastructure as a Service) using Terraform.
    - Storage: S3 (AWS)
    - CDN: CloudFront (AWS)
    - Domain Management: Route53 (AWS)
    - HTTPS: ACM (AWS)
    - Domain Registration: Onamae.com

## Features
- **User Authentication**
    - User name input and memory
- **Quiz Functionality**:
    - Select from multiple quiz genres
    - Present questions and accept answers
    - Judge correct/incorrect answers
    - Display quiz results and reset to the home screen
- **Navigation**:
    - Reset to the home screen after a quiz ends
    - Intuitive screen transitions

## How to Run
These are the steps to run this project in a local environment.
1.  **Clone the repository**:
    ```bash
    git clone https://github.com/Hasegawa-git/QuizApp
    cd QuizApp
    ```
2.  **Install packages**:
    ```bash
    npm install
    ```
3.  **Start the development server**:
    ```bash
    npm start
    ```
    The app will automatically open in your browser at http://localhost:3000.

## Future Outlook
- **Additional Features**:
    - Add a time limit: Set a time limit for answering each question.
    - Show correct/incorrect status: Instantly display whether an answer is correct or incorrect.
- **UI Improvements**:
    - CSS adjustments: Adjust the design for a more refined UI/UX.
    - Introduce animations: Add animations for screen transitions and button clicks.
- **Backend Development**:
    - Score ranking feature: Save user scores.
    - Advanced user authentication: Introduce a login feature to manage play history.

