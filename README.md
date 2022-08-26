# AEM WKND Sites Project

## How to build

For **AEM 6.5.x - Fedex Test**: 

Ensure Java 11 is used 
Apache Maven 3.8.5

```
$ cd aem-guides-wknd/
$ mvn clean install -PautoInstallSinglePackage -Pclassic
```
Install packages present in aem-guides-wknd/installables and drag the RSS extractor component RSS in any of the content path in myproject
