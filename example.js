// Load the full build.

let sesh_nums = [];
let session_timestamps = [];
let session_coordinates = [];

$(document).ready(function () {
  $('#get-data').click(function () {
    var showData = $('#show-data');

    $.getJSON('http://localhost:8080/example.json', function (data) {
      console.log(data);

      for(let session in data['rehab']) {
        sesh_nums.push(getNumberExercisesInSession(data['rehab'], session));
        session_timestamps.push(getSessionDate(data['rehab'], session));
      }

      console.log(sesh_nums);
      console.log(session_timestamps);

      // create series
      session_coordinates = zip(session_timestamps, sesh_nums);
      console.log(session_coordinates);

      Highcharts.charts[0].series[0].setData(session_coordinates);
    });

    // puts text into the element with the id show-data
    showData.text('Loading the JSON file.');
  });

  // show chart
  var myChart = Highcharts.chart('container', {
      chart: {
          type: 'line'
      },
      title: {
          text: 'Rehab exercises'
      },
      xAxis: {
          text: 'Date'
      },
      yAxis: {
          title: {
              text: 'Number of exercises'
          }
      },
      series: [{
          type: 'line',
          data: session_coordinates,
      }]
  });

});

function getExerciseID(rehabData, sessionNumber, exerciseNumber) {
  return rehabData[sessionNumber]['exercises'][exerciseNumber]['exercise_id'];
}

function getNumberExercisesInSession(rehabData, sessionNumber) {
  return rehabData[sessionNumber]['exercises'].length;
}

function getSessionDate(rehabData, sessionNumber) {
  let date = Math.floor(rehabData[sessionNumber]['start_timestamp']*1000);
  date = new Date(date);
  return date;
}

function zip(array1, array2) {
  try {
    if(array1.length != array2.length) throw "Arrays not of equal size";
  }
  catch(err) {
    console.log(err);
  }

  let zipped = [];
  for(let i=0; i<array1.length; i++) {
    let pair = [array1[i], array2[i]];
    zipped.push(pair);
  }

  return zipped;
}
// mock function to see functionality of mocha very cool
function pow(x, n) {
  return x**n;
}

export {pow, zip};

// describe("pow", function() {
//
//   it("2 raised to power 3 is 8", function() {
//     assert.equal(pow(2, 3), 8);
//   });
//
//   it("3 raised to power 4 is 81", function() {
//     assert.equal(pow(3, 4), 81);
//   });
//
// });
//
// describe("zip", function() {
//
//   it("zip two equally long arrays", function() {
//     let arr1 = [1,2,3,4];
//     let arr2 = ['a', 'b', 'c', 'd'];
//     let expected = [[1, 'a'], [2, 'b'], [3, 'c'], [4, 'd']];
//
//     assert.equal(zip(arr1, arr2), expected);
//   })
// });
