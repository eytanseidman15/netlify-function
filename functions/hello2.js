exports.handler = async event => {
    //start the timer
    var start = new Date()

    let itemPrices = ['22.88', '98.7', '108.2', '4.5','1245.4']
    fruits.itemPrices(function(item, index, array) {
        console.log(item, index)
      })

    //end timer and print
    var end = new Date() - start
    console.info('Execution time: %dms', end)


    return {
        statusCode: 200,
        body: `Hello ${itemPrices}`
    }
}