const u = 1 / 2 ** 53;

function gamma(n) {
    return n * u / (1 - n * u);
}

function pairwiseSum(x) {
    const arr = [...x];
    while (arr.length > 1) {
        let i = 0;
        while (i <= arr.length - 2) {
            if (arr.length === 1) break;
            arr[i] += arr[i + 1];
            arr.splice(i + 1, 1);
            i += 1;
        }
    }
    return arr[0];
}

function arctang(x, n) {
    let values = [];
    let absVal = [];
    let xPower = x;
    for (let i = 0; i < n; i++) {
        const value = xPower / (2 * i + 1);
        values.push(i % 2 === 0 ? value : -value);
        absVal.push(Math.abs(value))
        xPower *= x * x;
    }

    let cuttingError = Math.abs(values[values.length - 1]);
    values.pop();
    absVal.pop();
    const result = pairwiseSum(values);
    const absRes = pairwiseSum(absVal);

    let xError = x * u;
    let termErr = 0;

    for (let i = 1; i < n-1; i++) {
        termErr += absVal[i] * gamma(2 + 4 * i); 
    } 

    let sumError = absRes * gamma(6);
    let represError = xError + termErr;

    let absError = sumError + cuttingError + represError;

    return {
        value: result,
        error: absError
    };              
}

function calculatePi() {
    const x1 = 1/5;
    const x2 = 1/239;
    count = 65;

    const aTanX1Data = arctang(x1, count);
    const aTanX2Data = arctang(x2, count);

    const PI = (16 * aTanX1Data.value) - (4 * aTanX2Data.value);

    let PiError = PI * u; 
    let PI_error = (16 * aTanX1Data.error) + (4 * aTanX2Data.error) + PiError;  

    console.log("Вычисленное π:\n", PI.toFixed(40));
    console.log("Абсолютная ошибка:\n", PI_error);
};

calculatePi();