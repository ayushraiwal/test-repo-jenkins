pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                sh 'git clone https://github.com/your-username/your-nodejs-repo.git .' // Replace with your git clone command
            }
        }
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t your-nodejs-app-image:latest .' // Replace with your image name
            }
        }
        stage('Run Node.js Application') {
            steps {
                sh 'docker run -d --name node-app -p 8000:8000 your-nodejs-app-image:latest'
            }
        }
    }
}