// Content.js
import React, {Component} from 'react';
import { useEffect, useState } from 'react';
import {connect} from 'react-redux';

//var __html = require('localhost:8000/static/courses/blockchain.html');
//var template = { __html: __html };

export default class EmbedCourse extends Component {

  state = {
    extHTML: ""
  };

  //static fetchExternalHTML(fileName) {
    /*
    Ajax.getJSON('/myAPI/getExternalHTML/' + fileName).then(
  response => {
        this.setState({
          extHTML: response
        });
      }, err => {
        //handle your error here
      }
    );*/
  //}

  readSingleFile = () => {
    //Retrieve the first (and only!) File from the FileList object
    /*var f = new File([new Blob()], "/static/courses/blockchain.txt", {type:"text/plain"});//'/static/courses/blockchain.html';//evt.target.files[0];

    if (f) {
      var r = new FileReader();
      r.onload = function(e) {
	      var contents = e.target.result;
        alert( "Got the file.\n"
              +"name: " + f.name + "\n"
              +"type: " + f.type + "\n"
              +"size: " + f.size + " bytes\n"
              + "starts with: " + contents.substr(1, contents.indexOf("n"))
        );
        this.setState({
          extHTML: contents
        });
      }
      r.readAsDataURL(f);
    } else {
      alert("Failed to load file");
    }*/

    var blob = null;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/static/courses/blockchain.txt");
    xhr.responseType = "text/plain";//force the HTTP response, response-type header to be blob
    xhr.onload = function()
    {
        blob = xhr.response;//xhr.response is now a blob object
    }
    xhr.send();

    var myReader = new FileReader();
    myReader.addEventListener("loadend", function(e){
        var str = e.srcElement.result;
        console.log(str);
    });
    myReader.readAsText(blob);
  }

  readTextFile = file => {
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = () => {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status == 0) {
                    var allText = rawFile.responseText;
                    console.log("allText: ", allText);
                    this.setState({
                        extHTML: allText
                    });
                }
            }
        };
        rawFile.send(null);
    }


    /**
     * read text input
     */
    readText = () => {
      var filePath = "/static/courses/blockchain.txt";
        var output = ""; //placeholder for text output
        if(filePath.files && filePath.files[0]) {
            reader.onload = function (e) {
                output = e.target.result;
                //displayContents(output);
            };//end onload()
            reader.readAsText(filePath.files[0]);
        }//end if html5 filelist support
        else if(ActiveXObject && filePath) { //fallback to IE 6-8 support via ActiveX
            try {
                reader = new ActiveXObject("Scripting.FileSystemObject");
                var file = reader.OpenTextFile(filePath, 1); //ActiveX File Object
                output = file.ReadAll(); //text contents of file
                file.Close(); //close file "input stream"
                console.log(output);
                //displayContents(output);
            } catch (e) {
                if (e.number == -2146827859) {
                    alert('Unable to access local files due to browser security settings. ' +
                     'To overcome this, go to Tools->Internet Options->Security->Custom Level. ' +
                     'Find the setting for "Initialize and script ActiveX controls not marked as safe" and change it to "Enable" or "Prompt"');
                }
            }
        }
        else { //this is where you could fallback to Java Applet, Flash or similar
            return false;
        }
        return true;
    }

    getUsers  = () =>  {
      fetch('/static/courses/blockchain.html').then(
    response => {
          this.setState({
            extHTML: response
          });
          console.log(JSON.stringify(response));
        }, err => {
          //handle your error here
        });
  /*const response = fetch('/static/courses/blockchain.html');
  this.setState({
    extHTML: response
  });
  //const users = await response.json();*/
}
handleClick = () => {

    fetch('/static/courses/blockchain.txt')
    .then((r) => r.text())
    .then(text  => {
      //console.log(text);
            this.setState({
              extHTML: text
            });
    })
  }

  addCourseContent = () => {
    var iframeCourse = document.getElementById('course-template');
    var innerDocCourse = iframeCourse.contentDocument || iframeCourse.contentWindow.document;
    var iframeCourseContent = innerDocCourse.getElementById("course-templat");
    var innerDocCourseContent = iframeCourseContent.contentDocument || iframeCourseContent.contentWindow.document;
     //var deneme = document.getElementById("course-template");//contentWindow.document.activeElement.childNodes[3]; //document.activeElement.childNodes[3]
     console.log(this.state.extHTML);
     fetch('/static/courses/blockchain.txt')
     .then((r) => r.text())
     .then(text  => {
       innerDocCourseContent.getElementById("slides-view").innerHTML = "<section><h1>Blockchain Basics</h1></section><section><h1>Blockchain Basics</h1></section>";
       //console.log(text);
             this.setState({
               extHTML: text
             });
     })
  }

    componentDidMount(){
      //EmbedCourse.fetchExternalHTML("");
        //this.getUsers();
        //this.readSingleFile();
        //this.readText();
        //this.readTextFile("./static/courses/blockchain.txt");
        this.handleClick();
        //this.addCourseContent();
    }

    iframeLoad(e){
      this.addCourseContent();
    }



    render(){
        return (
          //<div dangerouslySetInnerHTML={{ __html: this.state.extHTML }}></div>
          <div><iframe id="course-template" src="/cour/blockchain" onLoad={(e) => this.iframeLoad(e)}></iframe></div>

        )
    }
}
