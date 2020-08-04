
const colors = [
{
  texture: 'img/wood_.jpg',
  size: [2, 2, 2],
  shininess: 60 },

{
  texture: 'img/fabric_.jpg',
  size: [4, 4, 4],
  shininess: 0 },

{
  texture: 'img/pattern_.jpg',
  size: [8, 8, 8],
  shininess: 10 },

{
  texture: 'img/denim_.jpg',
  size: [3, 3, 3],
  shininess: 0 },

{
  texture: 'img/quilt_.jpg',
  size: [6, 6, 6],
  shininess: 0 },

{
  color: '131417' },

{
  color: '374047' },

{
  color: '5f6e78' },

{
  color: '7f8a93' },

{
  color: '97a1a7' },

{
  color: 'acb4b9' },

{
  color: 'DF9998' },

{
  color: '7C6862' },

{
  color: 'A3AB84' },

{
  color: 'D6CCB1' },

{
  color: 'F8D5C4' },

{
  color: 'A3AE99' },

{
  color: 'EFF2F2' },

{
  color: 'B0C5C1' },

{
  color: '8B8C8C' },

{
  color: '565F59' },

{
  color: 'CB304A' },

{
  color: 'FED7C8' },

{
  color: 'C7BDBD' },

{
  color: '3DCBBE' },

{
  color: '264B4F' },

{
  color: '389389' },

{
  color: '85BEAE' },

{
  color: 'F2DABA' },

{
  color: 'F2A97F' },

{
  color: 'D85F52' },

{
  color: 'D92E37' },

{
  color: 'FC9736' },

{
  color: 'F7BD69' },

{
  color: 'A4D09C' },

{
  color: '4C8A67' },

{
  color: '25608A' },

{
  color: '75C8C6' },

{
  color: 'F5E4B7' },

{
  color: 'E69041' },

{
  color: 'E56013' },

{
  color: '11101D' },

{
  color: '630609' },

{
  color: 'C9240E' },

{
  color: 'EC4B17' },

{
  color: '281A1C' },

{
  color: '4F556F' },

{
  color: '64739B' },

{
  color: 'CDBAC7' },

{
  color: '946F43' },

{
  color: '66533C' },

{
  color: '173A2F' },

{
  color: '153944' },

{
  color: '27548D' },

{
  color: '438AAC' }];
const TRAY = document.getElementById('js-tray-slide');
  function buildColors(colors) {
  for (let [i, color] of colors.entries()) {
    let swatch = document.createElement('div');
    swatch.classList.add('tray__swatch');

    if (color.texture)
    {
      swatch.style.backgroundImage = "url(" + color.texture + ")";
    } else
    {
      swatch.style.background = "#" + color.color;
    }

    swatch.setAttribute('data-key', i);
    TRAY.append(swatch);
  }
}

buildColors(colors);
var theModel;
var activeOption = 'ArmRestSG';
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 200;

var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
var light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
keyLight.position.set(-100, 0, 100);

var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
fillLight.position.set(100, 0, 100);

var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
backLight.position.set(100, 0, -100).normalize();

scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);

var mtlLoader = new THREE.MTLLoader();
mtlLoader.setTexturePath('assets/');
mtlLoader.setPath('assets/');
mtlLoader.load('Sofa_Demo.mtl', function (materials) {

    materials.preload();
var lmaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);

    objLoader.setPath('assets/');
    objLoader.load('Sofa_Demo.obj', function (object) {
        console.log(object);
        theModel = object;
        scene.add(object);
        object.position.y -= 60;

    });

});

var animate = function () {
    requestAnimationFrame( animate );
    controls.update();
    renderer.render(scene, camera);
};

animate();

// Swatches
const swatches = document.querySelectorAll(".tray__swatch");

for (const swatch of swatches) {
  swatch.addEventListener('click', selectSwatch);
}

function selectSwatch(e) {
  let color = colors[parseInt(e.target.dataset.key)];
  let new_mtl;

  if (color.texture) {

    let txt = new THREE.TextureLoader().load(color.texture);

    txt.repeat.set(color.size[0], color.size[1], color.size[2]);
    txt.wrapS = THREE.RepeatWrapping;
    txt.wrapT = THREE.RepeatWrapping;

    new_mtl = new THREE.MeshPhongMaterial({
      map: txt,
      shininess: color.shininess ? color.shininess : 10 });

  } else

  {
    new_mtl = new THREE.MeshPhongMaterial({
      color: parseInt('0x' + color.color),
      shininess: color.shininess ? color.shininess : 10 });


  }

  setMaterial(theModel, activeOption, new_mtl);
}

function setMaterial(parent, type, mtl) {
    console.log(type);
 /* parent.traverse(o => {
    if (o.isMesh && o.nameID != null) {
      if (o.nameID == type) {
        o.material = mtl;
      }
    }
  });*/
  parent.traverse( function ( child ) {
                    if ( child instanceof THREE.Object3D  ) {
                        // console.log(child.name +"test");
                        if(child.material != undefined)
                        {
                                  console.log("~ materials ~");

                        /*console.log(child.material.name);*/
                        //console.log(child);
                        //console.log(object);
                        
                    if(child.material.name === type){
                        
                        child.material = mtl;
                    
                    }
                        }
                  
                    }
                } );
}
// Select Option
const options = document.querySelectorAll(".option");

for (const option of options) {
  option.addEventListener('click', selectOption);
}

function selectOption(e) {
  let option = e.target;
  activeOption = e.target.dataset.option;
  for (const otherOption of options) {
    otherOption.classList.remove('--is-active');
  }
  option.classList.add('--is-active');
}
