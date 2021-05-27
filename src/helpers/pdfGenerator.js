const { jsPDF } = require('jspdf')
require('jspdf-autotable')
var moment = require('moment'); 

module.exports = async function (result, res) {
  const doc = new jsPDF('p', 'mm');

  let startX = 15
  let startY = 20

  let formatDate = moment(new Date().toISOString().slice(0,10)).format("MMM DD, YYYY")

  String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
  }

  const header = [
    { header: 'Tasks', dataKey: 'title' },
    { header: 'Created By', dataKey: 'createdBy' },
    { header: 'Date', dataKey: 'date' },
    { header: 'Priority', dataKey: 'priority' },

  ]

  if (result.todoTasks.length > 0) {
    doc.text("Todo Tasks", startX, startY);
    startY += 5

    const table = doc.autoTable(header, result.todoTasks, {
        styles: { halign: 'left', fillColor: [209, 192, 192], lineWidth: number = 0.2},
        columnStyles: {
            title: { halign: 'left', fillColor: [255, 255, 255] }, 
            createdBy: { halign: 'left', fillColor: [255, 255, 255], cellWidth: 30 },
            date: { halign: 'left', fillColor: [255, 255, 255], cellWidth: 30  },
            priority: { halign: 'center', fillColor: [238, 205, 205], textColor: [0, 0, 0], cellWidth: 30 }},
    startY,

   didParseCell (HookData) {
    if (HookData.cell.section === 'body') {
      if (HookData.column.dataKey === 'date') {
        HookData.cell.text = formatDate
      }}
    if (HookData.cell.section === 'body') {
      if (HookData.column.dataKey === 'priority') {
       HookData.cell.text = [(HookData.cell.raw).charAt(0).toUpperCase() + (HookData.cell.raw).slice(1).toLowerCase()]
       
      }} 
    if (HookData.cell.section === 'body') {   
      if (HookData.column.dataKey === 'priority') {
        if (HookData.cell.text[0].indexOf('High') > -1) {
          HookData.cell.styles.fillColor = [255, 204, 204]; 
        }
        if (HookData.cell.text[0].indexOf('Medium') > -1) {
          HookData.cell.styles.fillColor = [255, 255, 204];    
        }
        if (HookData.cell.text[0].indexOf('Low') > -1) {
          HookData.cell.styles.fillColor = [229, 255, 204]; 
        }
      }}
    },

    didDrawPage (HookData) {
        return HookData.table
      }
    })

    startY = table.lastAutoTable.finalY + 16
  }

  if (result.doneTasks.length > 0) {
    doc.text("Done Tasks", startX, startY)
    startY += 5

    const table = doc.autoTable(header, result.doneTasks, {
      styles: { halign: 'left', fillColor: [209, 192, 192], lineWidth: number = 0.2 },
      columnStyles: { 
          title: { halign: 'left', fillColor: [255, 255, 255] }, 
          createdBy: { halign: 'left', fillColor: [255, 255, 255], cellWidth: 30  },
          date: { halign: 'left', fillColor: [255, 255, 255], cellWidth: 30  },
          priority: { halign: 'center', fillColor: [238, 205, 205], textColor: [0, 0, 0], cellWidth: 30 }},
    startY,

  didParseCell (HookData) {
    if (HookData.cell.section === 'body') {
      if (HookData.column.dataKey === 'date') {
        HookData.cell.text = formatDate
      }}
    if (HookData.cell.section === 'body') {
      if (HookData.column.dataKey === 'priority') {
       HookData.cell.text = [(HookData.cell.raw).charAt(0).toUpperCase() + (HookData.cell.raw).slice(1).toLowerCase()]
      }} 
    if (HookData.cell.section === 'body') {   
      if (HookData.column.dataKey === 'priority') {
        if (HookData.cell.text[0].indexOf('High') > -1) {
          HookData.cell.styles.fillColor = [255, 204, 204]; 
        }
        if (HookData.cell.text[0].indexOf('Medium') > -1) {
          HookData.cell.styles.fillColor = [255, 255, 204]; 
        }
        if (HookData.cell.text[0].indexOf('Low') > -1) {
          HookData.cell.styles.fillColor = [229, 255, 204]; 
        }
      }}
    },
        
        didDrawPage (HookData) {
            return HookData.table
          }
        })
    
        startY = table.lastAutoTable.finalY + 16
      }

  let AllTodos = result.todoTasks.length
  let AllDones = result.doneTasks.length

  doc.text("Total", startX, startY)
  startY += 5

  doc.autoTable({
      head: [['Total Todos', 'Total Dones']],
      body: [[AllTodos, AllDones]],
      styles: { halign: 'center', fillColor: [209, 192, 192], lineWidth: number = 0.2 },
        columnStyles: { 
            0: { halign: 'center', fillColor: [255, 255, 255], cellWidth: 30  }, 
            1: { halign: 'center', fillColor: [255, 255, 255], cellWidth: 30  }},
    startY,
  });
  
  res.setHeader('Content-Disposition', 'filename="' + encodeURIComponent(`TODO.pdf`) + '"')
  res.setHeader('Content-Type', 'application/pdf')
  res.end(doc.output(), 'binary')
}