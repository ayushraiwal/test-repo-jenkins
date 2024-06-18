pipeline {
    agent any

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t your-nodejs-app-image:latest .' // Replace with your image name

            }
        }

        stage('Stop') {

			steps {
				sh 'docker stop $(docker ps -aq --filter "name=node-app")'
			}
		}

        stage('Remove') {

			steps {
				sh 'docker rm $(docker ps -aq --filter "name=node-app")'
			}
		}
        
        stage('Run Node.js Application') {
            steps {
                sh 'docker run -d --name node-app -p 40005:40005 your-nodejs-app-image:latest'
            }
        }
    }
}
