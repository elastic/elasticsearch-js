pipeline {
  agent {
    docker {
      image 'node:10-alpine'
    }
  }

  stages {
    stage('System info') {
      steps {
        sh 'node --version'
        sh 'npm --version'
      }
    }

    stage('Install dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('License check') {
      steps {
        sh 'npm run license-checker'
      }
    }

    stage('Linter') {
      steps {
        sh 'npm run lint'
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
