var fs = require('fs-extra');
var path = require('path');

var routing;
var Location = './gd' ;
var c = 0;
var i =1 ;
var v = "1.0.2";
var copyCounter = 0;
var directoryCounter = 0; 
var directoryMakerCounter = 0;
var recursionCounter = -1;
var Flag = false;
var directoryPath = [] ;
var directoryName = [] ;
var directoryFileName = [];
var fileName;
var directoryNameStorer;
var dc = 0;
var route ;
var basePath
var mainDirName = [];
var ND;


function walk(dir, newDirName){
    
    
    
    
   
    if(i==1){
        if (!fs.existsSync(newDirName)){
            mainDirName[dc] = dir;
            
            
            basePath = path.join(__dirname, newDirName);
            
            fs.mkdirSync(newDirName);
        }
        
    }
    
    fs.readdir(dir, function(err, items) {
        
        items.forEach(function(file){

            file = path.resolve(dir, file); 
            
            fs.stat(file, function(err, stat){
                if(stat && stat.isDirectory()){
                    
                    directoryNameStorer = path.basename(file);
                    
                    route = file;
                    
                    if(i==1){
                        answer = mainDirName[0].substring(2,mainDirName[0].length);
                        
                        routing = route.replace(answer, newDirName);
                    }else{
                        route = route.replace(answer,newDirName);
                    }
                    
                    
                    directoryFileName[directoryCounter] = routing;
                   
                    directoryPath[directoryCounter] = file;
                    
                    directoryName[directoryCounter] = directoryNameStorer;

                    directoryCounter++;
                    dc++;
                    
                   
                    if (!fs.existsSync(basePath+"/"+directoryName[directoryMakerCounter])){
                        
                        
                        fs.mkdirSync(directoryFileName[directoryMakerCounter]);
                        directoryMakerCounter++;
                    }
                
                }else{
                    
                        fileName = path.basename(file);
                        if(recursionCounter >= 0){
                            fs.copyFileSync(file, directoryFileName[recursionCounter]+"/"+newDirName+"_"+fileName, err => {
                                if(err) return console.error(err);
                            });
                            copyCounter++;
                        }else{
                            fs.copyFileSync(file, newDirName+"/"+newDirName+"_"+fileName, err => {
                                if(err) return console.error(err);
                            });
                            copyCounter++;    
                        }
                       
                    }
                    if(copyCounter + dc == items.length && directoryCounter > 0 && recursionCounter < directoryMakerCounter-1){
                        console.log("COPY COUNTER :             "+copyCounter);
                        console.log("DC COUNTER :               "+dc);                        
                        recursionCounter++;
                        dc = 0;
                        copyCounter = 0;
                        console.log("ITEM DOT LENGTH :          "+items.length);
                        console.log("RECURSION COUNTER :        "+recursionCounter);
                        console.log("DIRECOTRY MAKER COUNTER :  "+directoryMakerCounter);
                        console.log(": START RECURSION :        "+directoryPath[recursionCounter]);
                        
                        walk(directoryPath[recursionCounter], newDirName);

                    }

            })
        })
    });
    
}
module.exports.walk = walk;
