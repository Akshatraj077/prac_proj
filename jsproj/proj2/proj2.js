const form = document.querySelector('form');

form.addEventListener('submit', function(e){
    e.preventDefault();

    const height = parseInt(document.querySelector('#height').value)
    const weight = parseInt(document.querySelector('#weight').value)
    const result = document.querySelector('#results')

    if(height === '' || height <= 70 || isNaN(height)){
        result.innerHTML = `please give a valid height`;
    }
    else if(weight === '' || weight <= 0 || isNaN(weight)){
        result.innerHTML = `please give a valid weight`;
    }
    else{
        const bmi = (weight / ((height*height)/10000)).toFixed(2);
        let categ;
        if(bmi > 24.9) categ = "OverWeight";
        else if(bmi >= 18.9 && bmi <=24.9) categ = "Normal";
        else categ = "Underweight";
        result.innerHTML = `<span>BMI: ${bmi}, CATEGORY: ${categ}</span>`;
    }
});