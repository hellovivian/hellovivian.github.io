import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
import { CSS3DRenderer, CSS3DObject } from '../CSS3Renderer.js';
import React, { useEffect, useRef } from 'react';

const discoFiles = [
    'AIArt1.mp4', 'AIArt2.mp4', 'creep_done.m4v', 'darkhorse.m4v', 'daftpunk.m4v',
    , 'fightinggravity.m4v', 
    'lastcarnival.mp4', 'lana.mp4', 'nyc.mp4',
    'output_nights.mp4', 'stitched_nights.m4v', 'stitched_output.m4v',
     'taylor_mirrorball.mp4', 'yerb.m4v'
];

const tableRaw = [
    // symbol, atomic mass, group, period
    'H', '1.00794', 1, 1,
    'He', '4.002602', 18, 1,
    'Li', '6.941', 1, 2,
    'Be', '9.012182', 2, 2,
    'B', '10.811', 13, 2,
    'C', '12.0107', 14, 2,
    'N', '14.0067', 15, 2,
    'O', '15.9994', 16, 2,
    'F', '18.9984032', 17, 2,
    'Ne', '20.1797', 18, 2,
    'Na', '22.98976...', 1, 3,
    'Mg', '24.305', 2, 3,
    'Al', '26.9815386', 13, 3,
    'Si', '28.0855', 14, 3,
    'P', '30.973762', 15, 3,
    'S', '32.065', 16, 3,
    'Cl', '35.453', 17, 3,
    'Ar', '39.948', 18, 3,
    'K', '39.0983', 1, 4,
    'Ca', '40.078', 2, 4,
    'Sc', '44.955912', 3, 4,
    'Ti', '47.867', 4, 4,
    'V', '50.9415', 5, 4,
    'Cr', '51.9961', 6, 4,
    'Mn', '54.938045', 7, 4,
    'Fe', '55.845', 8, 4,
    'Co', '58.933195', 9, 4,
    'Ni', '58.6934', 10, 4,
    'Cu', '63.546', 11, 4,
    'Zn', '65.38', 12, 4,
    'Ga', '69.723', 13, 4,
    'Ge', '72.63', 14, 4,
    'As', '74.9216', 15, 4,
    'Se', '78.96', 16, 4,
    'Br', '79.904', 17, 4,
    'Kr', '83.798', 18, 4,
    'Rb', '85.4678', 1, 5,
    'Sr', '87.62', 2, 5,
    'Y', '88.90585', 3, 5,
    'Zr', '91.224', 4, 5,
    'Nb', '92.90638', 5, 5,
    'Mo', '95.96', 6, 5,
    'Tc', '(98)', 7, 5,
    'Ru', '101.07', 8, 5,
    'Rh', '102.9055', 9, 5,
    'Pd', '106.42', 10, 5,
    'Ag', '107.8682', 11, 5,
    'Cd', '112.411', 12, 5,
    'In', '114.818', 13, 5,
    'Sn', '118.71', 14, 5,
    'Sb', '121.76', 15, 5,
    'Te', '127.6', 16, 5,
    'I', '126.90447', 17, 5,
    'Xe', '131.293', 18, 5,
    'Cs', '132.9054519', 1, 6,
    'Ba', '137.327', 2, 6,
    'La', '138.90547', 4, 9,
    'Ce', '140.116', 5, 9,
    'Pr', '140.90765', 6, 9,
    'Nd', '144.242', 7, 9,
    'Pm', '(145)', 8, 9,
    'Sm', '150.36', 9, 9,
    'Eu', '151.964', 10, 9,
    'Gd', '157.25', 11, 9,
    'Tb', '158.92535', 12, 9,
    'Dy', '162.5', 13, 9,
    'Ho', '164.93032', 14, 9,
    'Er', '167.259', 15, 9,
    'Tm', '168.93421', 16, 9,
    'Yb', '173.054', 17, 9,
    'Lu', '174.9668', 18, 9,
    'Hf', '178.49', 4, 6,
    'Ta', '180.94788', 5, 6,
    'W', '183.84', 6, 6,
    'Re', '186.207', 7, 6,
    'Os', '190.23', 8, 6,
    'Ir', '192.217', 9, 6,
    'Pt', '195.084', 10, 6,
    'Au', '196.966569', 11, 6,
    'Hg', '200.59', 12, 6,
    'Tl', '204.3833', 13, 6,
    'Pb', '207.2', 14, 6,
    'Bi', '208.9804', 15, 6,
    'Po', '(209)', 16, 6,
    'At', '(210)', 17, 6,
    'Rn', '(222)', 18, 6,
    'Fr', '(223)', 1, 7,
    'Ra', '(226)', 2, 7,
    'Ac', '(227)', 4, 10,
    'Th', '232.03806', 5, 10,
    'Pa', '231.03588', 6, 10,
    'U', '238.02891', 7, 10,
    'Np', '(237)', 8, 10,
    'Pu', '(244)', 9, 10,
    'Am', '(243)', 10, 10,
    'Cm', '(247)', 11, 10,
    'Bk', '(247)', 12, 10,
    'Cf', '(251)', 13, 10,
    'Es', '(252)', 14, 10,
    'Fm', '(257)', 15, 10,
    'Md', '(258)', 16, 10,
    'No', '(259)', 17, 10,
    'Lr', '(262)', 18, 10,
    'Rf', '(267)', 4, 7,
    'Db', '(268)', 5, 7,
    'Sg', '(271)', 6, 7,
    'Bh', '(272)', 7, 7,
    'Hs', '(270)', 8, 7,
    'Mt', '(276)', 9, 7,
    'Ds', '(281)', 10, 7,
    'Rg', '(280)', 11, 7,
    'Cn', '(285)', 12, 7,
    'Nh', '(286)', 13, 7,
    'Fl', '(289)', 14, 7,
    'Mc', '(290)', 15, 7,
    'Lv', '(293)', 16, 7,
    'Ts', '(294)', 17, 7,
    'Og', '(294)', 18, 7
];

// Build the new table with a rotating file assignment
const table = [];
for (let i = 0; i < tableRaw.length; i += 4) {
    const file = discoFiles[(i / 4) % discoFiles.length];
    table.push(
        tableRaw[i], // symbol
        `./disco_videos/${file}`,
        tableRaw[i + 1], // atomic mass
        tableRaw[i + 2], // group
        tableRaw[i + 3]  // period
    );
}

const SphereBanner = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const currentMount = mountRef.current;
        var camera, scene, renderer;
        var objects = [];
        var targets = { sphere: [] };

        function init() {
            camera = new THREE.PerspectiveCamera(40, currentMount.clientWidth / currentMount.clientHeight, 1, 10000);
            camera.position.z = 3000;
            scene = new THREE.Scene();

            for (var i = 0; i < table.length; i += 5) {
                var element = document.createElement('div');
                element.className = 'element';
                var video = document.createElement('video');
                video.src = table[i + 1];
                video.autoplay = true;
                video.loop = true;
                video.muted = true;
                video.width = 196;
                video.height = 196;
                video.opacity = 0.75;
                element.appendChild(video);
                var object = new CSS3DObject(element);
                object.position.x = Math.random() * 4000 - 2000;
                object.position.y = Math.random() * 4000 - 2000;
                object.position.z = Math.random() * 4000 - 2000;
                scene.add(object);
                objects.push(object);
            }

            var vector = new THREE.Vector3();
            for (var i = 0, l = objects.length; i < l; i++) {
                var phi = Math.acos(-1 + (2 * i) / l);
                var theta = Math.sqrt(l * Math.PI) * phi;
                var object = new THREE.Object3D();
                object.position.setFromSphericalCoords(800, phi, theta);
                vector.copy(object.position).multiplyScalar(2);
                object.lookAt(vector);
                targets.sphere.push(object);
            }

            renderer = new CSS3DRenderer();
            renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
            currentMount.appendChild(renderer.domElement);

            transform(targets.sphere, 2000);
            window.addEventListener('resize', onWindowResize, false);
        }

        function transform(targets, duration) {
            TWEEN.removeAll();
            for (var i = 0; i < objects.length; i++) {
                var object = objects[i];
                var target = targets[i];
                new TWEEN.Tween(object.position)
                    .to({ x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration)
                    .easing(TWEEN.Easing.Exponential.InOut)
                    .start();
                new TWEEN.Tween(object.rotation)
                    .to({ x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration)
                    .easing(TWEEN.Easing.Exponential.InOut)
                    .start();
            }
            new TWEEN.Tween(this)
                .to({}, duration * 2)
                .onUpdate(render)
                .start();
        }

        function onWindowResize() {
            camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
            render();
        }

        function animate() {
            requestAnimationFrame(animate);
            TWEEN.update();
            // Rotate the scene
            scene.rotation.y += 0.001;
            render();
        }

        function render() {
            renderer.render(scene, camera);
        }

        init();
        animate();

        return () => {
            window.removeEventListener('resize', onWindowResize);
            currentMount.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={mountRef} style={{ width: '70%', height: '300px', margin: '0 auto'}} />;
};

export default SphereBanner;
