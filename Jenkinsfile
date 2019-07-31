#!/usr/bin/env groovy

library identifier: 'apm@current',
retriever: modernSCM(
  [$class: 'GitSCMSource',
  credentialsId: 'f94e9298-83ae-417e-ba91-85c279771570',
  id: '37cf2c00-2cc7-482e-8c62-7bbffef475e2',
  remote: 'git@github.com:elastic/apm-pipeline-library.git'])

pipeline {
  agent {
    label 'docker && immutable'
  }

  environment {
    REPO = 'elasticsearch-js'
    BASE_DIR = "src/github.com/elastic/${env.REPO}"
    NODE_JS_DEFAULT_VERSION = '10'
    HOME = "${env.WORKSPACE}"
    npm_config_cache = 'npm-cache'
  }

  options {
    timeout(time: 1, unit: 'HOURS')
    buildDiscarder(logRotator(numToKeepStr: '20', artifactNumToKeepStr: '20', daysToKeepStr: '30'))
    timestamps()
    ansiColor('xterm')
    disableResume()
    durabilityHint('PERFORMANCE_OPTIMIZED')
  }

  triggers {
    issueCommentTrigger('(?i).*(?:jenkins\\W+)?run\\W+(?:the\\W+)?tests(?:\\W+please)?.*')
  }

  stages {
    stage('Checkout') {
      options { skipDefaultCheckout() }
      steps {
        deleteDir()
        gitCheckout(basedir: "${BASE_DIR}", githubNotifyFirstTimeContributor: false)
        stash allowEmpty: true, name: 'source', useDefaultExcludes: false
      }
    }

    stage('Install dependencies') {
      options { skipDefaultCheckout() }
      steps {
        deleteDir()
        unstash 'source'
        script {
          buildDockerImage(image: "node:${env.NODE_JS_DEFAULT_VERSION}-alpine").inside(){
            dir("${BASE_DIR}"){
              sh '''node --version
                    npm --version'''
              sh 'npm install'
            }
          }
        }
        stash allowEmpty: true, name: 'source-dependencies', useDefaultExcludes: false
      }
    }

    stage('License check') {
      options { skipDefaultCheckout() }
      steps {
        deleteDir()
        unstash 'source-dependencies'
        script {
          buildDockerImage(image: "node:${env.NODE_JS_DEFAULT_VERSION}-alpine").inside(){
            dir("${BASE_DIR}"){
              sh 'npm run license-checker'
            }
          }
        }
      }
    }

    stage('Linter') {
      options { skipDefaultCheckout() }
      steps {
        deleteDir()
        unstash 'source-dependencies'
        script {
          buildDockerImage(image: "node:${env.NODE_JS_DEFAULT_VERSION}-alpine").inside(){
            dir("${BASE_DIR}"){
              sh 'npm run lint'
            }
          }
        }
      }
    }

    stage('Unit test') {
      failFast true
      options { skipDefaultCheckout() }
      parallel {
        stage('Node.js v8') {
          agent { label 'docker && immutable' }
          options { skipDefaultCheckout() }
          steps {
            deleteDir()
            unstash 'source'
            script {
              buildDockerImage(image: 'node:8-alpine').inside(){
                dir("${BASE_DIR}"){
                  sh 'npm install'
                  sh 'npm run test:unit'
                  sh 'npm run test:behavior'
                  sh 'npm run test:types'
                }
              }
            }
          }
        }

        stage('Node.js v10') {
          agent { label 'docker && immutable' }
          options { skipDefaultCheckout() }
          steps {
            deleteDir()
            unstash 'source'
            script {
              buildDockerImage(image: 'node:10-alpine').inside(){
                dir("${BASE_DIR}"){
                  sh 'npm install'
                  sh 'npm run test:unit'
                  sh 'npm run test:behavior'
                  sh 'npm run test:types'
                }
              }
            }
          }
        }

        stage('Node.js v12') {
          agent { label 'docker && immutable' }
          options { skipDefaultCheckout() }
          steps {
            deleteDir()
            unstash 'source'
            script {
              buildDockerImage(image: 'node:12-alpine').inside(){
                dir("${BASE_DIR}"){
                  sh 'npm install'
                  sh 'npm run test:unit'
                  sh 'npm run test:behavior'
                  sh 'npm run test:types'
                }
              }
            }
          }
        }
      }
    }

    stage('Integration test') {
      failFast true
      options { skipDefaultCheckout() }
      parallel {
        stage('OSS') {
          agent { label 'docker && immutable' }
          options { skipDefaultCheckout() }
          environment {
            TEST_ES_SERVER = 'http://elasticsearch:9200'
          }
          steps {
            deleteDir()
            unstash 'source-dependencies'
            dir("${BASE_DIR}"){
              // Sometimes the docker registry fails and has random timeouts
              // this block will retry a doker image 3 times before to fail.
              retry(3) {
                sleep randomNumber(min: 5, max: 10)
                sh(label: 'Start Elasticsearch', script: './scripts/es-docker.sh --detach')
              }
            }
            script {
              buildDockerImage(fromDockerfile: true).inside('--network=elastic'){
                dir("${BASE_DIR}"){
                  sh(label: 'Integration test', script: 'npm run test:integration')
                }
              }
            }
            sh(label: 'Stop Elasticsearch', script: 'docker kill $(docker ps -q)')
          }
        }

        stage('xPack') {
          agent { label 'docker && immutable' }
          options { skipDefaultCheckout() }
          environment {
            TEST_ES_SERVER = 'https://elastic:changeme@elasticsearch:9200'
          }
          steps {
            deleteDir()
            unstash 'source-dependencies'
            dir("${BASE_DIR}"){
              // Sometimes the docker registry fails and has random timeouts
              // this block will retry a doker image 3 times before to fail.
              retry(3) {
                sleep randomNumber(min: 5, max: 10)
                sh(label: 'Start Elasticsearch', script: './scripts/es-docker-platinum.sh --detach')
              }
            }
            script {
              buildDockerImage(fromDockerfile: true).inside('--network=elastic'){
                dir("${BASE_DIR}"){
                  sh(label: 'Integration test', script: 'npm run test:integration')
                }
              }
            }
            sh(label: 'Stop Elasticsearch', script: 'docker kill $(docker ps -q)')
          }
        }
      }
    }
  }
}

// Sometimes the docker registry fails and has random timeouts
// this function will retry a doker image 3 times before to fail.
def buildDockerImage(args) {
  def image
  retry(3) {
    sleep randomNumber(min: 5, max: 10)
    if (args.fromDockerfile == true) {
      image = docker.build('nodejs-image', "--build-arg NODE_JS_VERSION=${env.NODE_JS_DEFAULT_VERSION} ${BASE_DIR}/.ci/docker")
    } else {
      image = docker.image(args.image)
    }
  }
  return image
}
