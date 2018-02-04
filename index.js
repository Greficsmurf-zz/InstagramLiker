var webdriver = require('selenium-webdriver');
var config = require('./config.json');


var driver = new webdriver.Builder().forBrowser('firefox').build();


//'use strict'
//login into account
 var login = async function(){
 	var element;
 	var prom = new Promise(function(resolve, reject){
 	//	if(config.Settings.all != 'true') resolve(() => console.log('resolvedByOne\n')); 

         resolve(() => {
         	console.log('Logged in...');
         });
      
 	});
 	var classname = '_3jvtb';
    await driver.get('https://www.instagram.com/accounts/login/')
    await driver.wait(webdriver.until.elementLocated(webdriver.By.name('username'))).catch(err => console.log('timeout rejet'));
    element = await driver.findElement(webdriver.By.name('username'));
    await element.sendKeys(config.Settings.username);
    element = await driver.findElement(webdriver.By.name('password'));
    await element.sendKeys(config.Settings.password, webdriver.Key.RETURN);
    element = await driver.findElements(webdriver.By.className(classname));
    
    return prom;
};


var like = async function(){
	
   var classname = '_mck9w _gvoze _f2mse';
   var heartClass = '_8scx2 coreSpriteHeartOpen', unheartClass = '_8scx2 coreSpriteHeartFull';
   var i = 0, text;
   var element = ['a'], test;
   await driver.sleep(1000);
   await driver.navigate().to('https://www.instagram.com/' + config.Settings.target + '/');
 
   driver.wait(webdriver.until.elementsLocated(webdriver.By.className(classname)));

   await driver.executeScript('window.open("new")');
   test = await driver.getAllWindowHandles();

   while(i != element.length){
   element = await driver.findElements(webdriver.By.tagName('a'));  
   text = await element[i++].getAttribute('href');
    
    await driver.actions().keyDown(webdriver.Key.SPACE).keyUp(webdriver.Key.SPACE).perform();
     
   if(text.indexOf('taken-by=') != -1){

     await driver.switchTo().window(test[1]);
     await driver.navigate().to(text);

     await driver.wait(webdriver.until.elementsLocated(webdriver.By.className('_rewi8')));
    
     driver.findElements(webdriver.By.className(heartClass))
     .then(found => found[0].click());
       
     await driver.wait(webdriver.until.elementsLocated(webdriver.By.className(unheartClass)));
    
    await driver.switchTo().window(test[0]);
     

   }
   }
   
   console.log('END');
   };

try{
 login().then(found => {
     found()
     like();
     
  });
 }catch(err){
 	console.log('ERROR ', err.message);
 }



//Select an image
//Click it and like it