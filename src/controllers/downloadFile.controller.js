const db = require('../db')
const Todo = db.Todo
const Done = db.Done

var xl = require('excel4node');

module.exports = async function (req, res) {
  try {
    const result = {
        todoTasks: req.body.todo ? await Todo.find({}).lean().exec() : [],
        doneTasks: req.body.done ? await Done.find({}).lean().exec() : [],
    }

    if (req.body.fileType === 'XLSX')  {
    var wb = new xl.Workbook();

    var ws = wb.addWorksheet('Tasks');

    const greenBgColumnsRows = wb.createStyle({
      font: {
        color: '#000000',
        size: 12,
      },
      fill: {
        type: "pattern",
        patternType: "solid",
        bgColor: "#CDDC39",
        fgColor: "#CDDC39"
      }
    });

    var style = wb.createStyle({
        font: {
          color: '#000000',
          size: 12,
        }
      });
    
    ws.column(1).setWidth(5)
    ws.column(2).setWidth(30)
    
    ws.cell(1, 1).string('Nr.').style(greenBgColumnsRows);
    ws.cell(1, 2).string('Tasks').style(greenBgColumnsRows);
    ws.cell(1, 3).string('Status').style(greenBgColumnsRows);
    ws.cell(1, 4).string('Priority').style(greenBgColumnsRows);
    ws.cell(1, 5).string('Created by').style(greenBgColumnsRows);

    let row = 1
    let index = 0
    for await (const item of result.todoTasks) {
        row++
        index++
        ws.cell(row, 1).number(index).style(style)
        ws.cell(row, 2).string(item.title).style(style);
        ws.cell(row, 3).string('Todo').style(style);
        ws.cell(row, 4).string(item.priority.toLowerCase()).style(style); 
        ws.cell(row, 5).string(item.createdBy).style(style);
    }
    for await (const item of result.doneTasks) {
        row++
        index++
        ws.cell(row, 1).number(index).style(style)
        ws.cell(row, 2).string(item.title).style(style);
        ws.cell(row, 3).string('Done').style(style);
        ws.cell(row, 4).string(item.priority.toLowerCase()).style(style); 
        ws.cell(row, 5).string(item.createdBy).style(style);
    }
    row++
    row++
    for await (const item of result.todoTasks) {
    ws.cell(row, 2).string('Total of Todo`s').style(greenBgColumnsRows);
    ws.cell(row, 3).formula(`SUM(${Aindex})`).style(style)
    }
    row++
    for await (const item of result.doneTasks) {
    ws.cell(row, 2).string('Total of Done`s').style(greenBgColumnsRows);
    ws.cell(row, 3).formula(`SUM(${index})`).style(style)
    }

    wb.write('Excel.xlsx', res )}
    
    if (req.body.fileType === 'PDF') {
        //TODO
    }

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
