pipeline {
  agent { 
    label 'linux'
  }

  stages {
    stage('Install dependencies') {
      steps {
        script {
          docker.image('node:10-alpine').inside(){
            sh '''node --version
                  npm --version'''
            sh 'npm install'
          }
        }
      }
    }

    stage('License check') {
      steps {
        script {
          docker.image('node:10-alpine').inside(){
            sh 'npm run license-checker'
          }
        }
      }
    }

    stage('Linter') {
      steps {
        script {
          docker.image('node:10-alpine').inside(){
            sh 'npm run lint'
          }
        }
      }
    }

    stage('Unit test') {
      steps {
        echo 'Unit test'
      }
    }

    stage('OSS integration test') {
      steps {
        echo 'OSS integration test'
      }
    }

    stage('xPack integration test') {
      steps {
        echo 'xPack integration test'
      }
    }
  }
}
