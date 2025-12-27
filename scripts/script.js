

const unitOpts = document.querySelectorAll('.nav .units .drop-opt label');
const unitSwitch = document.querySelector('.unit-dropdown');

console.log(unitSwitch);

unitOpts.forEach(opts => {
    opts.addEventListener('click', () => {
        unitSwitch.checked = false;
    })
})