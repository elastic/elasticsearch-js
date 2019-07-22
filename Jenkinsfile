pipeline {
  agent {
    docker {
      image 'node:10-alpine'
    }
  }

  stages {
    stage('System info') {
      steps {
        node --version
        npm --version
      }
    }

    stage('Install dependencies') {
      steps {
        npm install
      }
    }

    stage('License check') {
      steps {
        npm run license-checker
      }
    }

    stage('Linter') {
      steps {
        npm run lint
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
