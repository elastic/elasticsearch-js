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
    NODE_JS_VERSIONS = '8,10,12'
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
              sh(label: 'System info', script: '''node --version
                    npm --version''')
              sh(label: 'Install dependencies', script: 'npm install')
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
              sh(label: 'Check production dependencies licenses', script: 'npm run license-checker')
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
              sh(label: 'Lint code with standardjs', script: 'npm run lint')
            }
          }
        }
      }
    }

    stage('Unit test') {
      failFast true
      options { skipDefaultCheckout() }
      steps {
        script {
          def versions = env.NODE_JS_VERSIONS.split(',')
          def parallelTasks = [:]
          versions.each{ version ->
            parallelTasks["Node.js v${version}"] = buildUnitTest(version: version)
          }
          parallel(parallelTasks)
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
                  sh(label: 'Integration test', script: 'npm run test:integration | tee test-integration.tap')
                  sh(label: 'Generating test reporting', script: './node_modules/.bin/tap-mocha-reporter xunit < test-integration.tap > junit-integration.xml')
                }
              }
            }
            sh(label: 'Stop Elasticsearch', script: 'docker kill $(docker ps -q)')
            junit(allowEmptyResults: true, keepLongStdio: true, testResults: "${BASE_DIR}/**/junit-*.xml")
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
                  sh(label: 'Integration test', script: 'npm run test:integration | tee test-integration.tap')
                  sh(label: 'Generating test reporting', script: './node_modules/.bin/tap-mocha-reporter xunit < test-integration.tap > junit-integration.xml')
                }
              }
            }
            sh(label: 'Stop Elasticsearch', script: 'docker kill $(docker ps -q)')
            junit(allowEmptyResults: true, keepLongStdio: true, testResults: "${BASE_DIR}/**/junit-*.xml")
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

def buildUnitTest(args) {
  return {
    node('docker && immutable') {
      deleteDir()
      unstash 'source'
      script {
        buildDockerImage(image: "node:${args.version}-alpine").inside(){
          dir("${BASE_DIR}"){
            sh(label: 'Install dependencies', script: 'npm install')
            sh(label: 'Run unit test', script: 'npm run test:unit | tee test-unit.tap')
            sh(label: 'Run behavior test', script: 'npm run test:behavior | tee test-behavior.tap')
            sh(label: 'Run types test', script: 'npm run test:types')
            sh(label: 'Generating test reporting', script: '''./node_modules/.bin/tap-mocha-reporter xunit < test-unit.tap > junit-unit.xml
./node_modules/.bin/tap-mocha-reporter xunit < test-behavior.tap > junit-behavior.xml''')
          }
        }
      }
      junit(allowEmptyResults: true, keepLongStdio: true, testResults: "${BASE_DIR}/**/junit-*.xml")
    }
  }
}
