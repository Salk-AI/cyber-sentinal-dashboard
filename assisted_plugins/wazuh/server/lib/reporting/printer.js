"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReportPrinter = void 0;
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _printer = _interopRequireDefault(require("pdfmake/src/printer"));
var _clockIconRaw = _interopRequireDefault(require("./clock-icon-raw"));
var _filterIconRaw = _interopRequireDefault(require("./filter-icon-raw"));
var TimSort = _interopRequireWildcard(require("timsort"));
var _constants = require("../../../common/constants");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const COLORS = {
  PRIMARY: _constants.REPORTS_PRIMARY_COLOR
};
const pageConfiguration = ({
  pathToLogo,
  pageHeader,
  pageFooter
}) => ({
  styles: {
    h1: {
      fontSize: 22,
      monslight: true,
      color: COLORS.PRIMARY
    },
    h2: {
      fontSize: 18,
      monslight: true,
      color: COLORS.PRIMARY
    },
    h3: {
      fontSize: 16,
      monslight: true,
      color: COLORS.PRIMARY
    },
    h4: {
      fontSize: 14,
      monslight: true,
      color: COLORS.PRIMARY
    },
    standard: {
      color: '#333'
    },
    whiteColorFilters: {
      color: '#FFF',
      fontSize: 14
    },
    whiteColor: {
      color: '#FFF'
    }
  },
  pageMargins: [40, 80, 40, 80],
  header: {
    margin: [40, 20, 0, 0],
    columns: [{
      image: _path.default.join(__dirname, `../../../public/assets/${pathToLogo}`),
      fit: [190, 50]
    }, {
      text: pageHeader,
      alignment: 'right',
      margin: [0, 0, 40, 0],
      color: COLORS.PRIMARY,
      width: 'auto'
    }]
  },
  content: [],
  footer(currentPage, pageCount) {
    return {
      columns: [{
        text: pageFooter,
        color: COLORS.PRIMARY,
        margin: [40, 40, 0, 0]
      }, {
        text: 'Page ' + currentPage.toString() + ' of ' + pageCount,
        alignment: 'right',
        margin: [0, 40, 40, 0],
        color: COLORS.PRIMARY,
        width: 'auto'
      }]
    };
  },
  pageBreakBefore(currentNode, followingNodesOnPage) {
    if (currentNode.id && currentNode.id.includes('splitvis')) {
      return followingNodesOnPage.length === 6 || followingNodesOnPage.length === 7;
    }
    if (currentNode.id && currentNode.id.includes('splitsinglevis') || currentNode.id && currentNode.id.includes('singlevis')) {
      return followingNodesOnPage.length === 6;
    }
    return false;
  }
});
const fonts = {
  Roboto: {
    normal: _path.default.join(__dirname, '../../../public/assets/fonts/opensans/OpenSans-Light.ttf'),
    bold: _path.default.join(__dirname, '../../../public/assets/fonts/opensans/OpenSans-Bold.ttf'),
    italics: _path.default.join(__dirname, '../../../public/assets/fonts/opensans/OpenSans-Italic.ttf'),
    bolditalics: _path.default.join(__dirname, '../../../public/assets/fonts/opensans/OpenSans-BoldItalic.ttf'),
    monslight: _path.default.join(__dirname, '../../../public/assets/fonts/opensans/Montserrat-Light.ttf')
  }
};
class ReportPrinter {
  constructor(logger, configuration) {
    this.logger = logger;
    this.configuration = configuration;
    _defineProperty(this, "_content", void 0);
    _defineProperty(this, "_printer", void 0);
    this._printer = new _printer.default(fonts);
    this._content = [];
  }
  addContent(...content) {
    this._content.push(...content);
    return this;
  }
  addConfigTables(tables) {
    this.logger.debug(`Started to render configuration tables: ${tables.length}`);
    for (const table of tables) {
      let rowsparsed = table.rows;
      if (Array.isArray(rowsparsed) && rowsparsed.length) {
        const rows = rowsparsed.length > 100 ? rowsparsed.slice(0, 99) : rowsparsed;
        this.addContent({
          text: table.title,
          style: {
            fontSize: 11,
            color: '#000'
          },
          margin: table.title && table.type === 'table' ? [0, 0, 0, 5] : ''
        });
        if (table.title === 'Monitored directories') {
          this.addContent({
            text: 'RT: Real time | WD: Who-data | Per.: Permission | MT: Modification time | SL: Symbolic link | RL: Recursion level',
            style: {
              fontSize: 8,
              color: COLORS.PRIMARY
            },
            margin: [0, 0, 0, 5]
          });
        }
        const full_body = [];
        const modifiedRows = rows.map(row => row.map(cell => ({
          text: cell || '-',
          style: 'standard'
        })));
        // for (const row of rows) {
        //   modifiedRows.push(
        //     row.map(cell => ({ text: cell || '-', style: 'standard' }))
        //   );
        // }
        let widths = [];
        widths = Array(table.columns.length - 1).fill('auto');
        widths.push('*');
        if (table.type === 'config') {
          full_body.push(table.columns.map(col => ({
            text: col || '-',
            border: [0, 0, 0, 20],
            fontSize: 0,
            colSpan: 2
          })), ...modifiedRows);
          this.addContent({
            fontSize: 8,
            table: {
              headerRows: 0,
              widths,
              body: full_body,
              dontBreakRows: true
            },
            layout: {
              fillColor: i => i === 0 ? '#fff' : null,
              hLineColor: () => '#D3DAE6',
              hLineWidth: () => 1,
              vLineWidth: () => 0
            }
          });
        } else if (table.type === 'table') {
          full_body.push(table.columns.map(col => ({
            text: col || '-',
            style: 'whiteColor',
            border: [0, 0, 0, 0]
          })), ...modifiedRows);
          this.addContent({
            fontSize: 8,
            table: {
              headerRows: 1,
              widths,
              body: full_body
            },
            layout: {
              fillColor: i => i === 0 ? COLORS.PRIMARY : null,
              hLineColor: () => COLORS.PRIMARY,
              hLineWidth: () => 1,
              vLineWidth: () => 0
            }
          });
        }
        this.addNewLine();
      }
      this.logger.debug('Table rendered');
    }
  }
  addTables(tables) {
    this.logger.debug(`Started to render tables: ${tables.length}`);
    for (const table of tables) {
      let rowsparsed = [];
      rowsparsed = table.rows;
      if (Array.isArray(rowsparsed) && rowsparsed.length) {
        const rows = rowsparsed.length > 100 ? rowsparsed.slice(0, 99) : rowsparsed;
        this.addContent({
          text: table.title,
          style: 'h3',
          pageBreak: 'before',
          pageOrientation: table.columns.length >= 9 ? 'landscape' : 'portrait'
        });
        this.addNewLine();
        const full_body = [];
        const sortTableRows = (a, b) => parseInt(a[a.length - 1]) < parseInt(b[b.length - 1]) ? 1 : parseInt(a[a.length - 1]) > parseInt(b[b.length - 1]) ? -1 : 0;
        TimSort.sort(rows, sortTableRows);
        const modifiedRows = rows.map(row => row.map(cell => ({
          text: cell || '-',
          style: 'standard'
        })));

        // the width of the columns is assigned
        const widths = Array(table.columns.length - 1).fill('auto');
        widths.push('*');
        full_body.push(table.columns.map(col => ({
          text: col || '-',
          style: 'whiteColor',
          border: [0, 0, 0, 0]
        })), ...modifiedRows);
        this.addContent({
          fontSize: 8,
          table: {
            headerRows: 1,
            widths,
            body: full_body
          },
          layout: {
            fillColor: i => i === 0 ? COLORS.PRIMARY : null,
            hLineColor: () => COLORS.PRIMARY,
            hLineWidth: () => 1,
            vLineWidth: () => 0
          }
        });
        this.addNewLine();
        this.logger.debug('Table rendered');
      }
    }
  }
  addTimeRangeAndFilters(from, to, filters, timeZone) {
    this.logger.debug(`Started to render the time range and the filters: from: ${from}, to: ${to}, filters: ${filters}, timeZone: ${timeZone}`);
    const fromDate = new Date(new Date(from).toLocaleString('en-US', {
      timeZone
    }));
    const toDate = new Date(new Date(to).toLocaleString('en-US', {
      timeZone
    }));
    const str = `${this.formatDate(fromDate)} to ${this.formatDate(toDate)}`;
    this.addContent({
      fontSize: 8,
      table: {
        widths: ['*'],
        body: [[{
          columns: [{
            svg: _clockIconRaw.default,
            width: 10,
            height: 10,
            margin: [40, 5, 0, 0]
          }, {
            text: str || '-',
            margin: [43, 0, 0, 0],
            style: 'whiteColorFilters'
          }]
        }], [{
          columns: [{
            svg: _filterIconRaw.default,
            width: 10,
            height: 10,
            margin: [40, 6, 0, 0]
          }, {
            text: filters || '-',
            margin: [43, 0, 0, 0],
            style: 'whiteColorFilters'
          }]
        }]]
      },
      margin: [-40, 0, -40, 0],
      layout: {
        fillColor: () => COLORS.PRIMARY,
        hLineWidth: () => 0,
        vLineWidth: () => 0
      }
    });
    this.addContent({
      text: '\n'
    });
    this.logger.debug('Time range and filters rendered');
  }
  addVisualizationSingle(visualization) {
    this.addContent({
      id: 'singlevis' + visualization.id,
      text: visualization.title,
      style: 'h3'
    });
    this.addContent({
      columns: [{
        image: visualization.element,
        width: 500
      }]
    });
    this.addNewLine();
  }
  addVisualizationSplit(split) {
    this.addContent({
      columns: split.map(visualization => ({
        id: 'splitvis' + visualization.id,
        text: visualization.title,
        style: 'h3',
        width: 280
      }))
    });
    this.addContent({
      columns: split.map(visualization => ({
        image: visualization.element,
        width: 270
      }))
    });
    this.addNewLine();
  }
  addVisualizationSplitSingle(visualization) {
    this.addContent({
      columns: [{
        id: 'splitsinglevis' + visualization.id,
        text: visualization.title,
        style: 'h3',
        width: 280
      }]
    });
    this.addContent({
      columns: [{
        image: visualization.element,
        width: 280
      }]
    });
    this.addNewLine();
  }
  addVisualizations(visualizations) {
    this.logger.debug(`Add visualizations [${visualizations.length}]`);
    const sanitazedVisualizations = visualizations.map((visualization, index) => ({
      ...visualization,
      title: visualization.title || '',
      id: `${visualization.title || ''}.${index}`
    }));
    const {
      single: fullWidthVisualizations,
      split: splitWidthVisualizations
    } = sanitazedVisualizations.reduce((accum, visualization) => {
      (visualization.width >= 600 ? accum.single : accum.split).push(visualization);
      return accum;
    }, {
      single: [],
      split: []
    });
    fullWidthVisualizations.forEach(visualization => this.addVisualizationSingle(visualization));
    const splitBy = 2;
    const splits = splitWidthVisualizations.reduce(function (accum, value, index, array) {
      if (index % splitBy === 0) accum.push(array.slice(index, index + splitBy));
      return accum;
    }, []);
    splits.forEach(split => {
      if (split.length === splitBy) {
        return this.addVisualizationSplit(split);
      }
      this.addVisualizationSplitSingle(split[0]);
    });
  }
  formatDate(date) {
    this.logger.debug(`Format date ${date}`);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const str = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}T${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    this.logger.debug(`str: ${str}`);
    return str;
  }
  addSimpleTable({
    columns,
    items,
    title
  }) {
    if (title) {
      this.addContent(typeof title === 'string' ? {
        text: title,
        style: 'h4'
      } : title).addNewLine();
    }
    if (!items || !items.length) {
      this.addContent({
        text: 'No results match your search criteria',
        style: 'standard'
      });
      return this;
    }
    const tableHeader = columns.map(column => {
      return {
        text: column.label,
        style: 'whiteColor',
        border: [0, 0, 0, 0]
      };
    });
    const tableRows = items.map((item, index) => {
      return columns.map(column => {
        const cellValue = item[column.id];
        return {
          text: typeof cellValue !== 'undefined' ? cellValue : '-',
          style: 'standard'
        };
      });
    });

    // 385 is the max initial width per column
    let totalLength = columns.length - 1;
    const widthColumn = 385 / totalLength;
    let totalWidth = totalLength * widthColumn;
    const widths = [];
    for (let step = 0; step < columns.length - 1; step++) {
      let columnLength = this.getColumnWidth(columns[step], tableRows, step);
      if (columnLength <= Math.round(totalWidth / totalLength)) {
        widths.push(columnLength);
        totalWidth -= columnLength;
      } else {
        widths.push(Math.round(totalWidth / totalLength));
        totalWidth -= Math.round(totalWidth / totalLength);
      }
      totalLength--;
    }
    widths.push('*');
    this.addContent({
      fontSize: 8,
      table: {
        headerRows: 1,
        widths,
        body: [tableHeader, ...tableRows]
      },
      layout: {
        fillColor: i => i === 0 ? COLORS.PRIMARY : null,
        hLineColor: () => COLORS.PRIMARY,
        hLineWidth: () => 1,
        vLineWidth: () => 0
      }
    }).addNewLine();
    return this;
  }
  addList({
    title,
    list
  }) {
    return this.addContentWithNewLine(typeof title === 'string' ? {
      text: title,
      style: 'h2'
    } : title).addContent({
      ul: list.filter(element => element)
    }).addNewLine();
  }
  addNewLine() {
    return this.addContent({
      text: '\n'
    });
  }
  addContentWithNewLine(title) {
    return this.addContent(title).addNewLine();
  }
  addAgentsFilters(agents) {
    this.logger.debug(`Started to render the authorized agents filters: agents: ${agents}`);
    this.addNewLine();
    this.addContent({
      text: 'NOTE: This report only includes the authorized agents of the user who generated the report',
      style: {
        fontSize: 10,
        color: COLORS.PRIMARY
      },
      margin: [0, 0, 0, 5]
    });

    /*TODO: This will be enabled by a config*/
    /* this.addContent({
      fontSize: 8,
      table: {
        widths: ['*'],
        body: [
          [
            {
              columns: [
                {
                  svg: filterIconRaw,
                  width: 10,
                  height: 10,
                  margin: [40, 6, 0, 0]
                },
                {
                  text: `Agent IDs: ${agents}` || '-',
                  margin: [43, 0, 0, 0],
                  style: { fontSize: 8, color: '#333' }
                }
              ]
            }
          ]
        ]
      },
      margin: [-40, 0, -40, 0],
      layout: {
        fillColor: () => null,
        hLineWidth: () => 0,
        vLineWidth: () => 0
      }
    }); */

    this.addContent({
      text: '\n'
    });
    this.logger.debug('Time range and filters rendered');
  }
  async print(reportPath) {
    return new Promise((resolve, reject) => {
      // Get configuration settings
      this.configuration.getCustomizationSetting('customization.logo.reports', 'customization.reports.header', 'customization.reports.footer').then(configuration => {
        try {
          const {
            'customization.logo.reports': pathToLogo,
            'customization.reports.header': pageHeader,
            'customization.reports.footer': pageFooter
          } = configuration;
          const document = this._printer.createPdfKitDocument({
            ...pageConfiguration({
              pathToLogo,
              pageHeader,
              pageFooter
            }),
            content: this._content
          });
          document.on('error', reject);
          document.on('end', resolve);
          document.pipe(_fs.default.createWriteStream(reportPath));
          document.end();
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  /**
   * Returns the width of a given column
   *
   * @param column
   * @param tableRows
   * @param step
   * @returns {number}
   */
  getColumnWidth(column, tableRows, index) {
    const widthCharacter = 5; //min width per character

    //Get the longest row value
    const maxRowLength = tableRows.reduce((maxLength, row) => {
      return row[index].text.length > maxLength ? row[index].text.length : maxLength;
    }, 0);

    //Get column name length
    const headerLength = column.label.length;

    //Use the longest to get the column width
    const maxLength = maxRowLength > headerLength ? maxRowLength : headerLength;
    return maxLength * widthCharacter;
  }
}
exports.ReportPrinter = ReportPrinter;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfZnMiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwicmVxdWlyZSIsIl9wYXRoIiwiX3ByaW50ZXIiLCJfY2xvY2tJY29uUmF3IiwiX2ZpbHRlckljb25SYXciLCJUaW1Tb3J0IiwiX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQiLCJfY29uc3RhbnRzIiwiX2dldFJlcXVpcmVXaWxkY2FyZENhY2hlIiwiZSIsIldlYWtNYXAiLCJyIiwidCIsIl9fZXNNb2R1bGUiLCJkZWZhdWx0IiwiaGFzIiwiZ2V0IiwibiIsIl9fcHJvdG9fXyIsImEiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsInUiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsImNhbGwiLCJpIiwic2V0Iiwib2JqIiwiX2RlZmluZVByb3BlcnR5Iiwia2V5IiwidmFsdWUiLCJfdG9Qcm9wZXJ0eUtleSIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsImFyZyIsIl90b1ByaW1pdGl2ZSIsIlN0cmluZyIsImlucHV0IiwiaGludCIsInByaW0iLCJTeW1ib2wiLCJ0b1ByaW1pdGl2ZSIsInVuZGVmaW5lZCIsInJlcyIsIlR5cGVFcnJvciIsIk51bWJlciIsIkNPTE9SUyIsIlBSSU1BUlkiLCJSRVBPUlRTX1BSSU1BUllfQ09MT1IiLCJwYWdlQ29uZmlndXJhdGlvbiIsInBhdGhUb0xvZ28iLCJwYWdlSGVhZGVyIiwicGFnZUZvb3RlciIsInN0eWxlcyIsImgxIiwiZm9udFNpemUiLCJtb25zbGlnaHQiLCJjb2xvciIsImgyIiwiaDMiLCJoNCIsInN0YW5kYXJkIiwid2hpdGVDb2xvckZpbHRlcnMiLCJ3aGl0ZUNvbG9yIiwicGFnZU1hcmdpbnMiLCJoZWFkZXIiLCJtYXJnaW4iLCJjb2x1bW5zIiwiaW1hZ2UiLCJwYXRoIiwiam9pbiIsIl9fZGlybmFtZSIsImZpdCIsInRleHQiLCJhbGlnbm1lbnQiLCJ3aWR0aCIsImNvbnRlbnQiLCJmb290ZXIiLCJjdXJyZW50UGFnZSIsInBhZ2VDb3VudCIsInRvU3RyaW5nIiwicGFnZUJyZWFrQmVmb3JlIiwiY3VycmVudE5vZGUiLCJmb2xsb3dpbmdOb2Rlc09uUGFnZSIsImlkIiwiaW5jbHVkZXMiLCJsZW5ndGgiLCJmb250cyIsIlJvYm90byIsIm5vcm1hbCIsImJvbGQiLCJpdGFsaWNzIiwiYm9sZGl0YWxpY3MiLCJSZXBvcnRQcmludGVyIiwiY29uc3RydWN0b3IiLCJsb2dnZXIiLCJjb25maWd1cmF0aW9uIiwiUGRmUHJpbnRlciIsIl9jb250ZW50IiwiYWRkQ29udGVudCIsInB1c2giLCJhZGRDb25maWdUYWJsZXMiLCJ0YWJsZXMiLCJkZWJ1ZyIsInRhYmxlIiwicm93c3BhcnNlZCIsInJvd3MiLCJBcnJheSIsImlzQXJyYXkiLCJzbGljZSIsInRpdGxlIiwic3R5bGUiLCJ0eXBlIiwiZnVsbF9ib2R5IiwibW9kaWZpZWRSb3dzIiwibWFwIiwicm93IiwiY2VsbCIsIndpZHRocyIsImZpbGwiLCJjb2wiLCJib3JkZXIiLCJjb2xTcGFuIiwiaGVhZGVyUm93cyIsImJvZHkiLCJkb250QnJlYWtSb3dzIiwibGF5b3V0IiwiZmlsbENvbG9yIiwiaExpbmVDb2xvciIsImhMaW5lV2lkdGgiLCJ2TGluZVdpZHRoIiwiYWRkTmV3TGluZSIsImFkZFRhYmxlcyIsInBhZ2VCcmVhayIsInBhZ2VPcmllbnRhdGlvbiIsInNvcnRUYWJsZVJvd3MiLCJiIiwicGFyc2VJbnQiLCJzb3J0IiwiYWRkVGltZVJhbmdlQW5kRmlsdGVycyIsImZyb20iLCJ0byIsImZpbHRlcnMiLCJ0aW1lWm9uZSIsImZyb21EYXRlIiwiRGF0ZSIsInRvTG9jYWxlU3RyaW5nIiwidG9EYXRlIiwic3RyIiwiZm9ybWF0RGF0ZSIsInN2ZyIsImNsb2NrSWNvblJhdyIsImhlaWdodCIsImZpbHRlckljb25SYXciLCJhZGRWaXN1YWxpemF0aW9uU2luZ2xlIiwidmlzdWFsaXphdGlvbiIsImVsZW1lbnQiLCJhZGRWaXN1YWxpemF0aW9uU3BsaXQiLCJzcGxpdCIsImFkZFZpc3VhbGl6YXRpb25TcGxpdFNpbmdsZSIsImFkZFZpc3VhbGl6YXRpb25zIiwidmlzdWFsaXphdGlvbnMiLCJzYW5pdGF6ZWRWaXN1YWxpemF0aW9ucyIsImluZGV4Iiwic2luZ2xlIiwiZnVsbFdpZHRoVmlzdWFsaXphdGlvbnMiLCJzcGxpdFdpZHRoVmlzdWFsaXphdGlvbnMiLCJyZWR1Y2UiLCJhY2N1bSIsImZvckVhY2giLCJzcGxpdEJ5Iiwic3BsaXRzIiwiYXJyYXkiLCJkYXRlIiwieWVhciIsImdldEZ1bGxZZWFyIiwibW9udGgiLCJnZXRNb250aCIsImRheSIsImdldERhdGUiLCJob3VycyIsImdldEhvdXJzIiwibWludXRlcyIsImdldE1pbnV0ZXMiLCJzZWNvbmRzIiwiZ2V0U2Vjb25kcyIsImFkZFNpbXBsZVRhYmxlIiwiaXRlbXMiLCJ0YWJsZUhlYWRlciIsImNvbHVtbiIsImxhYmVsIiwidGFibGVSb3dzIiwiaXRlbSIsImNlbGxWYWx1ZSIsInRvdGFsTGVuZ3RoIiwid2lkdGhDb2x1bW4iLCJ0b3RhbFdpZHRoIiwic3RlcCIsImNvbHVtbkxlbmd0aCIsImdldENvbHVtbldpZHRoIiwiTWF0aCIsInJvdW5kIiwiYWRkTGlzdCIsImxpc3QiLCJhZGRDb250ZW50V2l0aE5ld0xpbmUiLCJ1bCIsImZpbHRlciIsImFkZEFnZW50c0ZpbHRlcnMiLCJhZ2VudHMiLCJwcmludCIsInJlcG9ydFBhdGgiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImdldEN1c3RvbWl6YXRpb25TZXR0aW5nIiwidGhlbiIsImRvY3VtZW50IiwiY3JlYXRlUGRmS2l0RG9jdW1lbnQiLCJvbiIsInBpcGUiLCJmcyIsImNyZWF0ZVdyaXRlU3RyZWFtIiwiZW5kIiwiZXJyb3IiLCJ3aWR0aENoYXJhY3RlciIsIm1heFJvd0xlbmd0aCIsIm1heExlbmd0aCIsImhlYWRlckxlbmd0aCIsImV4cG9ydHMiXSwic291cmNlcyI6WyJwcmludGVyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBQZGZQcmludGVyIGZyb20gJ3BkZm1ha2Uvc3JjL3ByaW50ZXInO1xuaW1wb3J0IGNsb2NrSWNvblJhdyBmcm9tICcuL2Nsb2NrLWljb24tcmF3JztcbmltcG9ydCBmaWx0ZXJJY29uUmF3IGZyb20gJy4vZmlsdGVyLWljb24tcmF3JztcbmltcG9ydCAqIGFzIFRpbVNvcnQgZnJvbSAndGltc29ydCc7XG5pbXBvcnQgeyBSRVBPUlRTX1BSSU1BUllfQ09MT1IgfSBmcm9tICcuLi8uLi8uLi9jb21tb24vY29uc3RhbnRzJztcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gJ29wZW5zZWFyY2gtZGFzaGJvYXJkcy9zZXJ2ZXInO1xuaW1wb3J0IHsgSUNvbmZpZ3VyYXRpb25FbmhhbmNlZCB9IGZyb20gJy4uLy4uLy4uLy4uL3dhenVoLWNvcmUvc2VydmVyJztcblxuaW50ZXJmYWNlIElWaXN1YWxpemF0aW9uIHtcbiAgdGl0bGU6IHN0cmluZztcbiAgZWxlbWVudDogc3RyaW5nO1xuICBoZWlnaHQ6IG51bWJlcjtcbiAgd2lkdGg/OiBudW1iZXI7XG59XG5cbnR5cGUgSVZpc3VhbGl6YXRpb25FeHRlbmRlZCA9IElWaXN1YWxpemF0aW9uICYge1xuICBpZDogc3RyaW5nO1xuICB3aWR0aDogbnVtYmVyO1xufTtcblxuY29uc3QgQ09MT1JTID0ge1xuICBQUklNQVJZOiBSRVBPUlRTX1BSSU1BUllfQ09MT1IsXG59O1xuXG5jb25zdCBwYWdlQ29uZmlndXJhdGlvbiA9ICh7IHBhdGhUb0xvZ28sIHBhZ2VIZWFkZXIsIHBhZ2VGb290ZXIgfSkgPT4gKHtcbiAgc3R5bGVzOiB7XG4gICAgaDE6IHtcbiAgICAgIGZvbnRTaXplOiAyMixcbiAgICAgIG1vbnNsaWdodDogdHJ1ZSxcbiAgICAgIGNvbG9yOiBDT0xPUlMuUFJJTUFSWSxcbiAgICB9LFxuICAgIGgyOiB7XG4gICAgICBmb250U2l6ZTogMTgsXG4gICAgICBtb25zbGlnaHQ6IHRydWUsXG4gICAgICBjb2xvcjogQ09MT1JTLlBSSU1BUlksXG4gICAgfSxcbiAgICBoMzoge1xuICAgICAgZm9udFNpemU6IDE2LFxuICAgICAgbW9uc2xpZ2h0OiB0cnVlLFxuICAgICAgY29sb3I6IENPTE9SUy5QUklNQVJZLFxuICAgIH0sXG4gICAgaDQ6IHtcbiAgICAgIGZvbnRTaXplOiAxNCxcbiAgICAgIG1vbnNsaWdodDogdHJ1ZSxcbiAgICAgIGNvbG9yOiBDT0xPUlMuUFJJTUFSWSxcbiAgICB9LFxuICAgIHN0YW5kYXJkOiB7XG4gICAgICBjb2xvcjogJyMzMzMnLFxuICAgIH0sXG4gICAgd2hpdGVDb2xvckZpbHRlcnM6IHtcbiAgICAgIGNvbG9yOiAnI0ZGRicsXG4gICAgICBmb250U2l6ZTogMTQsXG4gICAgfSxcbiAgICB3aGl0ZUNvbG9yOiB7XG4gICAgICBjb2xvcjogJyNGRkYnLFxuICAgIH0sXG4gIH0sXG4gIHBhZ2VNYXJnaW5zOiBbNDAsIDgwLCA0MCwgODBdLFxuICBoZWFkZXI6IHtcbiAgICBtYXJnaW46IFs0MCwgMjAsIDAsIDBdLFxuICAgIGNvbHVtbnM6IFtcbiAgICAgIHtcbiAgICAgICAgaW1hZ2U6IHBhdGguam9pbihfX2Rpcm5hbWUsIGAuLi8uLi8uLi9wdWJsaWMvYXNzZXRzLyR7cGF0aFRvTG9nb31gKSxcbiAgICAgICAgZml0OiBbMTkwLCA1MF0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiBwYWdlSGVhZGVyLFxuICAgICAgICBhbGlnbm1lbnQ6ICdyaWdodCcsXG4gICAgICAgIG1hcmdpbjogWzAsIDAsIDQwLCAwXSxcbiAgICAgICAgY29sb3I6IENPTE9SUy5QUklNQVJZLFxuICAgICAgICB3aWR0aDogJ2F1dG8nLFxuICAgICAgfSxcbiAgICBdLFxuICB9LFxuICBjb250ZW50OiBbXSxcbiAgZm9vdGVyKGN1cnJlbnRQYWdlLCBwYWdlQ291bnQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sdW1uczogW1xuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogcGFnZUZvb3RlcixcbiAgICAgICAgICBjb2xvcjogQ09MT1JTLlBSSU1BUlksXG4gICAgICAgICAgbWFyZ2luOiBbNDAsIDQwLCAwLCAwXSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdQYWdlICcgKyBjdXJyZW50UGFnZS50b1N0cmluZygpICsgJyBvZiAnICsgcGFnZUNvdW50LFxuICAgICAgICAgIGFsaWdubWVudDogJ3JpZ2h0JyxcbiAgICAgICAgICBtYXJnaW46IFswLCA0MCwgNDAsIDBdLFxuICAgICAgICAgIGNvbG9yOiBDT0xPUlMuUFJJTUFSWSxcbiAgICAgICAgICB3aWR0aDogJ2F1dG8nLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9O1xuICB9LFxuICBwYWdlQnJlYWtCZWZvcmUoY3VycmVudE5vZGUsIGZvbGxvd2luZ05vZGVzT25QYWdlKSB7XG4gICAgaWYgKGN1cnJlbnROb2RlLmlkICYmIGN1cnJlbnROb2RlLmlkLmluY2x1ZGVzKCdzcGxpdHZpcycpKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICBmb2xsb3dpbmdOb2Rlc09uUGFnZS5sZW5ndGggPT09IDYgfHwgZm9sbG93aW5nTm9kZXNPblBhZ2UubGVuZ3RoID09PSA3XG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICAoY3VycmVudE5vZGUuaWQgJiYgY3VycmVudE5vZGUuaWQuaW5jbHVkZXMoJ3NwbGl0c2luZ2xldmlzJykpIHx8XG4gICAgICAoY3VycmVudE5vZGUuaWQgJiYgY3VycmVudE5vZGUuaWQuaW5jbHVkZXMoJ3NpbmdsZXZpcycpKVxuICAgICkge1xuICAgICAgcmV0dXJuIGZvbGxvd2luZ05vZGVzT25QYWdlLmxlbmd0aCA9PT0gNjtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9LFxufSk7XG5cbmNvbnN0IGZvbnRzID0ge1xuICBSb2JvdG86IHtcbiAgICBub3JtYWw6IHBhdGguam9pbihcbiAgICAgIF9fZGlybmFtZSxcbiAgICAgICcuLi8uLi8uLi9wdWJsaWMvYXNzZXRzL2ZvbnRzL29wZW5zYW5zL09wZW5TYW5zLUxpZ2h0LnR0ZicsXG4gICAgKSxcbiAgICBib2xkOiBwYXRoLmpvaW4oXG4gICAgICBfX2Rpcm5hbWUsXG4gICAgICAnLi4vLi4vLi4vcHVibGljL2Fzc2V0cy9mb250cy9vcGVuc2Fucy9PcGVuU2Fucy1Cb2xkLnR0ZicsXG4gICAgKSxcbiAgICBpdGFsaWNzOiBwYXRoLmpvaW4oXG4gICAgICBfX2Rpcm5hbWUsXG4gICAgICAnLi4vLi4vLi4vcHVibGljL2Fzc2V0cy9mb250cy9vcGVuc2Fucy9PcGVuU2Fucy1JdGFsaWMudHRmJyxcbiAgICApLFxuICAgIGJvbGRpdGFsaWNzOiBwYXRoLmpvaW4oXG4gICAgICBfX2Rpcm5hbWUsXG4gICAgICAnLi4vLi4vLi4vcHVibGljL2Fzc2V0cy9mb250cy9vcGVuc2Fucy9PcGVuU2Fucy1Cb2xkSXRhbGljLnR0ZicsXG4gICAgKSxcbiAgICBtb25zbGlnaHQ6IHBhdGguam9pbihcbiAgICAgIF9fZGlybmFtZSxcbiAgICAgICcuLi8uLi8uLi9wdWJsaWMvYXNzZXRzL2ZvbnRzL29wZW5zYW5zL01vbnRzZXJyYXQtTGlnaHQudHRmJyxcbiAgICApLFxuICB9LFxufTtcblxuZXhwb3J0IGNsYXNzIFJlcG9ydFByaW50ZXIge1xuICBwcml2YXRlIF9jb250ZW50OiBhbnlbXTtcbiAgcHJpdmF0ZSBfcHJpbnRlcjogUGRmUHJpbnRlcjtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGxvZ2dlcjogTG9nZ2VyLFxuICAgIHByaXZhdGUgY29uZmlndXJhdGlvbjogSUNvbmZpZ3VyYXRpb25FbmhhbmNlZCxcbiAgKSB7XG4gICAgdGhpcy5fcHJpbnRlciA9IG5ldyBQZGZQcmludGVyKGZvbnRzKTtcbiAgICB0aGlzLl9jb250ZW50ID0gW107XG4gIH1cbiAgYWRkQ29udGVudCguLi5jb250ZW50OiBhbnkpIHtcbiAgICB0aGlzLl9jb250ZW50LnB1c2goLi4uY29udGVudCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgYWRkQ29uZmlnVGFibGVzKHRhYmxlczogYW55KSB7XG4gICAgdGhpcy5sb2dnZXIuZGVidWcoXG4gICAgICBgU3RhcnRlZCB0byByZW5kZXIgY29uZmlndXJhdGlvbiB0YWJsZXM6ICR7dGFibGVzLmxlbmd0aH1gLFxuICAgICk7XG4gICAgZm9yIChjb25zdCB0YWJsZSBvZiB0YWJsZXMpIHtcbiAgICAgIGxldCByb3dzcGFyc2VkID0gdGFibGUucm93cztcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHJvd3NwYXJzZWQpICYmIHJvd3NwYXJzZWQubGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IHJvd3MgPVxuICAgICAgICAgIHJvd3NwYXJzZWQubGVuZ3RoID4gMTAwID8gcm93c3BhcnNlZC5zbGljZSgwLCA5OSkgOiByb3dzcGFyc2VkO1xuICAgICAgICB0aGlzLmFkZENvbnRlbnQoe1xuICAgICAgICAgIHRleHQ6IHRhYmxlLnRpdGxlLFxuICAgICAgICAgIHN0eWxlOiB7IGZvbnRTaXplOiAxMSwgY29sb3I6ICcjMDAwJyB9LFxuICAgICAgICAgIG1hcmdpbjogdGFibGUudGl0bGUgJiYgdGFibGUudHlwZSA9PT0gJ3RhYmxlJyA/IFswLCAwLCAwLCA1XSA6ICcnLFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGFibGUudGl0bGUgPT09ICdNb25pdG9yZWQgZGlyZWN0b3JpZXMnKSB7XG4gICAgICAgICAgdGhpcy5hZGRDb250ZW50KHtcbiAgICAgICAgICAgIHRleHQ6ICdSVDogUmVhbCB0aW1lIHwgV0Q6IFdoby1kYXRhIHwgUGVyLjogUGVybWlzc2lvbiB8IE1UOiBNb2RpZmljYXRpb24gdGltZSB8IFNMOiBTeW1ib2xpYyBsaW5rIHwgUkw6IFJlY3Vyc2lvbiBsZXZlbCcsXG4gICAgICAgICAgICBzdHlsZTogeyBmb250U2l6ZTogOCwgY29sb3I6IENPTE9SUy5QUklNQVJZIH0sXG4gICAgICAgICAgICBtYXJnaW46IFswLCAwLCAwLCA1XSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGZ1bGxfYm9keSA9IFtdO1xuXG4gICAgICAgIGNvbnN0IG1vZGlmaWVkUm93cyA9IHJvd3MubWFwKHJvdyA9PlxuICAgICAgICAgIHJvdy5tYXAoY2VsbCA9PiAoeyB0ZXh0OiBjZWxsIHx8ICctJywgc3R5bGU6ICdzdGFuZGFyZCcgfSkpLFxuICAgICAgICApO1xuICAgICAgICAvLyBmb3IgKGNvbnN0IHJvdyBvZiByb3dzKSB7XG4gICAgICAgIC8vICAgbW9kaWZpZWRSb3dzLnB1c2goXG4gICAgICAgIC8vICAgICByb3cubWFwKGNlbGwgPT4gKHsgdGV4dDogY2VsbCB8fCAnLScsIHN0eWxlOiAnc3RhbmRhcmQnIH0pKVxuICAgICAgICAvLyAgICk7XG4gICAgICAgIC8vIH1cbiAgICAgICAgbGV0IHdpZHRocyA9IFtdO1xuICAgICAgICB3aWR0aHMgPSBBcnJheSh0YWJsZS5jb2x1bW5zLmxlbmd0aCAtIDEpLmZpbGwoJ2F1dG8nKTtcbiAgICAgICAgd2lkdGhzLnB1c2goJyonKTtcblxuICAgICAgICBpZiAodGFibGUudHlwZSA9PT0gJ2NvbmZpZycpIHtcbiAgICAgICAgICBmdWxsX2JvZHkucHVzaChcbiAgICAgICAgICAgIHRhYmxlLmNvbHVtbnMubWFwKGNvbCA9PiAoe1xuICAgICAgICAgICAgICB0ZXh0OiBjb2wgfHwgJy0nLFxuICAgICAgICAgICAgICBib3JkZXI6IFswLCAwLCAwLCAyMF0sXG4gICAgICAgICAgICAgIGZvbnRTaXplOiAwLFxuICAgICAgICAgICAgICBjb2xTcGFuOiAyLFxuICAgICAgICAgICAgfSkpLFxuICAgICAgICAgICAgLi4ubW9kaWZpZWRSb3dzLFxuICAgICAgICAgICk7XG4gICAgICAgICAgdGhpcy5hZGRDb250ZW50KHtcbiAgICAgICAgICAgIGZvbnRTaXplOiA4LFxuICAgICAgICAgICAgdGFibGU6IHtcbiAgICAgICAgICAgICAgaGVhZGVyUm93czogMCxcbiAgICAgICAgICAgICAgd2lkdGhzLFxuICAgICAgICAgICAgICBib2R5OiBmdWxsX2JvZHksXG4gICAgICAgICAgICAgIGRvbnRCcmVha1Jvd3M6IHRydWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGF5b3V0OiB7XG4gICAgICAgICAgICAgIGZpbGxDb2xvcjogaSA9PiAoaSA9PT0gMCA/ICcjZmZmJyA6IG51bGwpLFxuICAgICAgICAgICAgICBoTGluZUNvbG9yOiAoKSA9PiAnI0QzREFFNicsXG4gICAgICAgICAgICAgIGhMaW5lV2lkdGg6ICgpID0+IDEsXG4gICAgICAgICAgICAgIHZMaW5lV2lkdGg6ICgpID0+IDAsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKHRhYmxlLnR5cGUgPT09ICd0YWJsZScpIHtcbiAgICAgICAgICBmdWxsX2JvZHkucHVzaChcbiAgICAgICAgICAgIHRhYmxlLmNvbHVtbnMubWFwKGNvbCA9PiAoe1xuICAgICAgICAgICAgICB0ZXh0OiBjb2wgfHwgJy0nLFxuICAgICAgICAgICAgICBzdHlsZTogJ3doaXRlQ29sb3InLFxuICAgICAgICAgICAgICBib3JkZXI6IFswLCAwLCAwLCAwXSxcbiAgICAgICAgICAgIH0pKSxcbiAgICAgICAgICAgIC4uLm1vZGlmaWVkUm93cyxcbiAgICAgICAgICApO1xuICAgICAgICAgIHRoaXMuYWRkQ29udGVudCh7XG4gICAgICAgICAgICBmb250U2l6ZTogOCxcbiAgICAgICAgICAgIHRhYmxlOiB7XG4gICAgICAgICAgICAgIGhlYWRlclJvd3M6IDEsXG4gICAgICAgICAgICAgIHdpZHRocyxcbiAgICAgICAgICAgICAgYm9keTogZnVsbF9ib2R5LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxheW91dDoge1xuICAgICAgICAgICAgICBmaWxsQ29sb3I6IGkgPT4gKGkgPT09IDAgPyBDT0xPUlMuUFJJTUFSWSA6IG51bGwpLFxuICAgICAgICAgICAgICBoTGluZUNvbG9yOiAoKSA9PiBDT0xPUlMuUFJJTUFSWSxcbiAgICAgICAgICAgICAgaExpbmVXaWR0aDogKCkgPT4gMSxcbiAgICAgICAgICAgICAgdkxpbmVXaWR0aDogKCkgPT4gMCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hZGROZXdMaW5lKCk7XG4gICAgICB9XG4gICAgICB0aGlzLmxvZ2dlci5kZWJ1ZygnVGFibGUgcmVuZGVyZWQnKTtcbiAgICB9XG4gIH1cblxuICBhZGRUYWJsZXModGFibGVzOiBhbnkpIHtcbiAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhgU3RhcnRlZCB0byByZW5kZXIgdGFibGVzOiAke3RhYmxlcy5sZW5ndGh9YCk7XG5cbiAgICBmb3IgKGNvbnN0IHRhYmxlIG9mIHRhYmxlcykge1xuICAgICAgbGV0IHJvd3NwYXJzZWQgPSBbXTtcbiAgICAgIHJvd3NwYXJzZWQgPSB0YWJsZS5yb3dzO1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkocm93c3BhcnNlZCkgJiYgcm93c3BhcnNlZC5sZW5ndGgpIHtcbiAgICAgICAgY29uc3Qgcm93cyA9XG4gICAgICAgICAgcm93c3BhcnNlZC5sZW5ndGggPiAxMDAgPyByb3dzcGFyc2VkLnNsaWNlKDAsIDk5KSA6IHJvd3NwYXJzZWQ7XG4gICAgICAgIHRoaXMuYWRkQ29udGVudCh7XG4gICAgICAgICAgdGV4dDogdGFibGUudGl0bGUsXG4gICAgICAgICAgc3R5bGU6ICdoMycsXG4gICAgICAgICAgcGFnZUJyZWFrOiAnYmVmb3JlJyxcbiAgICAgICAgICBwYWdlT3JpZW50YXRpb246IHRhYmxlLmNvbHVtbnMubGVuZ3RoID49IDkgPyAnbGFuZHNjYXBlJyA6ICdwb3J0cmFpdCcsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmFkZE5ld0xpbmUoKTtcbiAgICAgICAgY29uc3QgZnVsbF9ib2R5ID0gW107XG4gICAgICAgIGNvbnN0IHNvcnRUYWJsZVJvd3MgPSAoYSwgYikgPT5cbiAgICAgICAgICBwYXJzZUludChhW2EubGVuZ3RoIC0gMV0pIDwgcGFyc2VJbnQoYltiLmxlbmd0aCAtIDFdKVxuICAgICAgICAgICAgPyAxXG4gICAgICAgICAgICA6IHBhcnNlSW50KGFbYS5sZW5ndGggLSAxXSkgPiBwYXJzZUludChiW2IubGVuZ3RoIC0gMV0pXG4gICAgICAgICAgICA/IC0xXG4gICAgICAgICAgICA6IDA7XG5cbiAgICAgICAgVGltU29ydC5zb3J0KHJvd3MsIHNvcnRUYWJsZVJvd3MpO1xuXG4gICAgICAgIGNvbnN0IG1vZGlmaWVkUm93cyA9IHJvd3MubWFwKHJvdyA9PlxuICAgICAgICAgIHJvdy5tYXAoY2VsbCA9PiAoeyB0ZXh0OiBjZWxsIHx8ICctJywgc3R5bGU6ICdzdGFuZGFyZCcgfSkpLFxuICAgICAgICApO1xuXG4gICAgICAgIC8vIHRoZSB3aWR0aCBvZiB0aGUgY29sdW1ucyBpcyBhc3NpZ25lZFxuICAgICAgICBjb25zdCB3aWR0aHMgPSBBcnJheSh0YWJsZS5jb2x1bW5zLmxlbmd0aCAtIDEpLmZpbGwoJ2F1dG8nKTtcbiAgICAgICAgd2lkdGhzLnB1c2goJyonKTtcblxuICAgICAgICBmdWxsX2JvZHkucHVzaChcbiAgICAgICAgICB0YWJsZS5jb2x1bW5zLm1hcChjb2wgPT4gKHtcbiAgICAgICAgICAgIHRleHQ6IGNvbCB8fCAnLScsXG4gICAgICAgICAgICBzdHlsZTogJ3doaXRlQ29sb3InLFxuICAgICAgICAgICAgYm9yZGVyOiBbMCwgMCwgMCwgMF0sXG4gICAgICAgICAgfSkpLFxuICAgICAgICAgIC4uLm1vZGlmaWVkUm93cyxcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5hZGRDb250ZW50KHtcbiAgICAgICAgICBmb250U2l6ZTogOCxcbiAgICAgICAgICB0YWJsZToge1xuICAgICAgICAgICAgaGVhZGVyUm93czogMSxcbiAgICAgICAgICAgIHdpZHRocyxcbiAgICAgICAgICAgIGJvZHk6IGZ1bGxfYm9keSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGxheW91dDoge1xuICAgICAgICAgICAgZmlsbENvbG9yOiBpID0+IChpID09PSAwID8gQ09MT1JTLlBSSU1BUlkgOiBudWxsKSxcbiAgICAgICAgICAgIGhMaW5lQ29sb3I6ICgpID0+IENPTE9SUy5QUklNQVJZLFxuICAgICAgICAgICAgaExpbmVXaWR0aDogKCkgPT4gMSxcbiAgICAgICAgICAgIHZMaW5lV2lkdGg6ICgpID0+IDAsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuYWRkTmV3TGluZSgpO1xuICAgICAgICB0aGlzLmxvZ2dlci5kZWJ1ZygnVGFibGUgcmVuZGVyZWQnKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgYWRkVGltZVJhbmdlQW5kRmlsdGVycyhmcm9tLCB0bywgZmlsdGVycywgdGltZVpvbmUpIHtcbiAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhcbiAgICAgIGBTdGFydGVkIHRvIHJlbmRlciB0aGUgdGltZSByYW5nZSBhbmQgdGhlIGZpbHRlcnM6IGZyb206ICR7ZnJvbX0sIHRvOiAke3RvfSwgZmlsdGVyczogJHtmaWx0ZXJzfSwgdGltZVpvbmU6ICR7dGltZVpvbmV9YCxcbiAgICApO1xuXG4gICAgY29uc3QgZnJvbURhdGUgPSBuZXcgRGF0ZShcbiAgICAgIG5ldyBEYXRlKGZyb20pLnRvTG9jYWxlU3RyaW5nKCdlbi1VUycsIHsgdGltZVpvbmUgfSksXG4gICAgKTtcbiAgICBjb25zdCB0b0RhdGUgPSBuZXcgRGF0ZShuZXcgRGF0ZSh0bykudG9Mb2NhbGVTdHJpbmcoJ2VuLVVTJywgeyB0aW1lWm9uZSB9KSk7XG4gICAgY29uc3Qgc3RyID0gYCR7dGhpcy5mb3JtYXREYXRlKGZyb21EYXRlKX0gdG8gJHt0aGlzLmZvcm1hdERhdGUodG9EYXRlKX1gO1xuXG4gICAgdGhpcy5hZGRDb250ZW50KHtcbiAgICAgIGZvbnRTaXplOiA4LFxuICAgICAgdGFibGU6IHtcbiAgICAgICAgd2lkdGhzOiBbJyonXSxcbiAgICAgICAgYm9keTogW1xuICAgICAgICAgIFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgY29sdW1uczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHN2ZzogY2xvY2tJY29uUmF3LFxuICAgICAgICAgICAgICAgICAgd2lkdGg6IDEwLFxuICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAxMCxcbiAgICAgICAgICAgICAgICAgIG1hcmdpbjogWzQwLCA1LCAwLCAwXSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHRleHQ6IHN0ciB8fCAnLScsXG4gICAgICAgICAgICAgICAgICBtYXJnaW46IFs0MywgMCwgMCwgMF0sXG4gICAgICAgICAgICAgICAgICBzdHlsZTogJ3doaXRlQ29sb3JGaWx0ZXJzJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICAgIFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgY29sdW1uczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHN2ZzogZmlsdGVySWNvblJhdyxcbiAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMCxcbiAgICAgICAgICAgICAgICAgIGhlaWdodDogMTAsXG4gICAgICAgICAgICAgICAgICBtYXJnaW46IFs0MCwgNiwgMCwgMF0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICB0ZXh0OiBmaWx0ZXJzIHx8ICctJyxcbiAgICAgICAgICAgICAgICAgIG1hcmdpbjogWzQzLCAwLCAwLCAwXSxcbiAgICAgICAgICAgICAgICAgIHN0eWxlOiAnd2hpdGVDb2xvckZpbHRlcnMnLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgICAgbWFyZ2luOiBbLTQwLCAwLCAtNDAsIDBdLFxuICAgICAgbGF5b3V0OiB7XG4gICAgICAgIGZpbGxDb2xvcjogKCkgPT4gQ09MT1JTLlBSSU1BUlksXG4gICAgICAgIGhMaW5lV2lkdGg6ICgpID0+IDAsXG4gICAgICAgIHZMaW5lV2lkdGg6ICgpID0+IDAsXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgdGhpcy5hZGRDb250ZW50KHsgdGV4dDogJ1xcbicgfSk7XG4gICAgdGhpcy5sb2dnZXIuZGVidWcoJ1RpbWUgcmFuZ2UgYW5kIGZpbHRlcnMgcmVuZGVyZWQnKTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkVmlzdWFsaXphdGlvblNpbmdsZSh2aXN1YWxpemF0aW9uOiBJVmlzdWFsaXphdGlvbkV4dGVuZGVkKSB7XG4gICAgdGhpcy5hZGRDb250ZW50KHtcbiAgICAgIGlkOiAnc2luZ2xldmlzJyArIHZpc3VhbGl6YXRpb24uaWQsXG4gICAgICB0ZXh0OiB2aXN1YWxpemF0aW9uLnRpdGxlLFxuICAgICAgc3R5bGU6ICdoMycsXG4gICAgfSk7XG4gICAgdGhpcy5hZGRDb250ZW50KHtcbiAgICAgIGNvbHVtbnM6IFt7IGltYWdlOiB2aXN1YWxpemF0aW9uLmVsZW1lbnQsIHdpZHRoOiA1MDAgfV0sXG4gICAgfSk7XG4gICAgdGhpcy5hZGROZXdMaW5lKCk7XG4gIH1cbiAgcHJpdmF0ZSBhZGRWaXN1YWxpemF0aW9uU3BsaXQoXG4gICAgc3BsaXQ6IFtJVmlzdWFsaXphdGlvbkV4dGVuZGVkLCBJVmlzdWFsaXphdGlvbkV4dGVuZGVkXSxcbiAgKSB7XG4gICAgdGhpcy5hZGRDb250ZW50KHtcbiAgICAgIGNvbHVtbnM6IHNwbGl0Lm1hcCh2aXN1YWxpemF0aW9uID0+ICh7XG4gICAgICAgIGlkOiAnc3BsaXR2aXMnICsgdmlzdWFsaXphdGlvbi5pZCxcbiAgICAgICAgdGV4dDogdmlzdWFsaXphdGlvbi50aXRsZSxcbiAgICAgICAgc3R5bGU6ICdoMycsXG4gICAgICAgIHdpZHRoOiAyODAsXG4gICAgICB9KSksXG4gICAgfSk7XG5cbiAgICB0aGlzLmFkZENvbnRlbnQoe1xuICAgICAgY29sdW1uczogc3BsaXQubWFwKHZpc3VhbGl6YXRpb24gPT4gKHtcbiAgICAgICAgaW1hZ2U6IHZpc3VhbGl6YXRpb24uZWxlbWVudCxcbiAgICAgICAgd2lkdGg6IDI3MCxcbiAgICAgIH0pKSxcbiAgICB9KTtcblxuICAgIHRoaXMuYWRkTmV3TGluZSgpO1xuICB9XG4gIHByaXZhdGUgYWRkVmlzdWFsaXphdGlvblNwbGl0U2luZ2xlKHZpc3VhbGl6YXRpb246IElWaXN1YWxpemF0aW9uRXh0ZW5kZWQpIHtcbiAgICB0aGlzLmFkZENvbnRlbnQoe1xuICAgICAgY29sdW1uczogW1xuICAgICAgICB7XG4gICAgICAgICAgaWQ6ICdzcGxpdHNpbmdsZXZpcycgKyB2aXN1YWxpemF0aW9uLmlkLFxuICAgICAgICAgIHRleHQ6IHZpc3VhbGl6YXRpb24udGl0bGUsXG4gICAgICAgICAgc3R5bGU6ICdoMycsXG4gICAgICAgICAgd2lkdGg6IDI4MCxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSk7XG4gICAgdGhpcy5hZGRDb250ZW50KHtcbiAgICAgIGNvbHVtbnM6IFt7IGltYWdlOiB2aXN1YWxpemF0aW9uLmVsZW1lbnQsIHdpZHRoOiAyODAgfV0sXG4gICAgfSk7XG4gICAgdGhpcy5hZGROZXdMaW5lKCk7XG4gIH1cbiAgYWRkVmlzdWFsaXphdGlvbnModmlzdWFsaXphdGlvbnM6IElWaXN1YWxpemF0aW9uW10pIHtcbiAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhgQWRkIHZpc3VhbGl6YXRpb25zIFske3Zpc3VhbGl6YXRpb25zLmxlbmd0aH1dYCk7XG4gICAgY29uc3Qgc2FuaXRhemVkVmlzdWFsaXphdGlvbnM6IElWaXN1YWxpemF0aW9uRXh0ZW5kZWRbXSA9XG4gICAgICB2aXN1YWxpemF0aW9ucy5tYXAoKHZpc3VhbGl6YXRpb24sIGluZGV4KSA9PiAoe1xuICAgICAgICAuLi52aXN1YWxpemF0aW9uLFxuICAgICAgICB0aXRsZTogdmlzdWFsaXphdGlvbi50aXRsZSB8fCAnJyxcbiAgICAgICAgaWQ6IGAke3Zpc3VhbGl6YXRpb24udGl0bGUgfHwgJyd9LiR7aW5kZXh9YCxcbiAgICAgIH0pKTtcbiAgICBjb25zdCB7IHNpbmdsZTogZnVsbFdpZHRoVmlzdWFsaXphdGlvbnMsIHNwbGl0OiBzcGxpdFdpZHRoVmlzdWFsaXphdGlvbnMgfSA9XG4gICAgICBzYW5pdGF6ZWRWaXN1YWxpemF0aW9ucy5yZWR1Y2UoXG4gICAgICAgIChhY2N1bSwgdmlzdWFsaXphdGlvbikgPT4ge1xuICAgICAgICAgIChcbiAgICAgICAgICAgICh2aXN1YWxpemF0aW9uLndpZHRoID49IDYwMFxuICAgICAgICAgICAgICA/IGFjY3VtLnNpbmdsZVxuICAgICAgICAgICAgICA6IGFjY3VtLnNwbGl0KSBhcyBJVmlzdWFsaXphdGlvbkV4dGVuZGVkW11cbiAgICAgICAgICApLnB1c2godmlzdWFsaXphdGlvbik7XG4gICAgICAgICAgcmV0dXJuIGFjY3VtO1xuICAgICAgICB9LFxuICAgICAgICB7IHNpbmdsZTogW10sIHNwbGl0OiBbXSB9LFxuICAgICAgKTtcblxuICAgIGZ1bGxXaWR0aFZpc3VhbGl6YXRpb25zLmZvckVhY2godmlzdWFsaXphdGlvbiA9PlxuICAgICAgdGhpcy5hZGRWaXN1YWxpemF0aW9uU2luZ2xlKHZpc3VhbGl6YXRpb24pLFxuICAgICk7XG5cbiAgICBjb25zdCBzcGxpdEJ5ID0gMjtcbiAgICBjb25zdCBzcGxpdHMgPSBzcGxpdFdpZHRoVmlzdWFsaXphdGlvbnMucmVkdWNlKGZ1bmN0aW9uIChcbiAgICAgIGFjY3VtLFxuICAgICAgdmFsdWUsXG4gICAgICBpbmRleCxcbiAgICAgIGFycmF5LFxuICAgICkge1xuICAgICAgaWYgKGluZGV4ICUgc3BsaXRCeSA9PT0gMClcbiAgICAgICAgYWNjdW0ucHVzaChhcnJheS5zbGljZShpbmRleCwgaW5kZXggKyBzcGxpdEJ5KSk7XG4gICAgICByZXR1cm4gYWNjdW07XG4gICAgfSxcbiAgICBbXSk7XG5cbiAgICBzcGxpdHMuZm9yRWFjaChzcGxpdCA9PiB7XG4gICAgICBpZiAoc3BsaXQubGVuZ3RoID09PSBzcGxpdEJ5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFkZFZpc3VhbGl6YXRpb25TcGxpdChzcGxpdCk7XG4gICAgICB9XG4gICAgICB0aGlzLmFkZFZpc3VhbGl6YXRpb25TcGxpdFNpbmdsZShzcGxpdFswXSk7XG4gICAgfSk7XG4gIH1cbiAgZm9ybWF0RGF0ZShkYXRlOiBEYXRlKTogc3RyaW5nIHtcbiAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhgRm9ybWF0IGRhdGUgJHtkYXRlfWApO1xuICAgIGNvbnN0IHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgY29uc3QgbW9udGggPSBkYXRlLmdldE1vbnRoKCkgKyAxO1xuICAgIGNvbnN0IGRheSA9IGRhdGUuZ2V0RGF0ZSgpO1xuICAgIGNvbnN0IGhvdXJzID0gZGF0ZS5nZXRIb3VycygpO1xuICAgIGNvbnN0IG1pbnV0ZXMgPSBkYXRlLmdldE1pbnV0ZXMoKTtcbiAgICBjb25zdCBzZWNvbmRzID0gZGF0ZS5nZXRTZWNvbmRzKCk7XG4gICAgY29uc3Qgc3RyID0gYCR7eWVhcn0tJHttb250aCA8IDEwID8gJzAnICsgbW9udGggOiBtb250aH0tJHtcbiAgICAgIGRheSA8IDEwID8gJzAnICsgZGF5IDogZGF5XG4gICAgfVQke2hvdXJzIDwgMTAgPyAnMCcgKyBob3VycyA6IGhvdXJzfToke1xuICAgICAgbWludXRlcyA8IDEwID8gJzAnICsgbWludXRlcyA6IG1pbnV0ZXNcbiAgICB9OiR7c2Vjb25kcyA8IDEwID8gJzAnICsgc2Vjb25kcyA6IHNlY29uZHN9YDtcbiAgICB0aGlzLmxvZ2dlci5kZWJ1Zyhgc3RyOiAke3N0cn1gKTtcbiAgICByZXR1cm4gc3RyO1xuICB9XG5cbiAgYWRkU2ltcGxlVGFibGUoe1xuICAgIGNvbHVtbnMsXG4gICAgaXRlbXMsXG4gICAgdGl0bGUsXG4gIH06IHtcbiAgICBjb2x1bW5zOiB7IGlkOiBzdHJpbmc7IGxhYmVsOiBzdHJpbmcgfVtdO1xuICAgIHRpdGxlPzogc3RyaW5nIHwgeyB0ZXh0OiBzdHJpbmc7IHN0eWxlOiBzdHJpbmcgfTtcbiAgICBpdGVtczogYW55W107XG4gIH0pIHtcbiAgICBpZiAodGl0bGUpIHtcbiAgICAgIHRoaXMuYWRkQ29udGVudChcbiAgICAgICAgdHlwZW9mIHRpdGxlID09PSAnc3RyaW5nJyA/IHsgdGV4dDogdGl0bGUsIHN0eWxlOiAnaDQnIH0gOiB0aXRsZSxcbiAgICAgICkuYWRkTmV3TGluZSgpO1xuICAgIH1cblxuICAgIGlmICghaXRlbXMgfHwgIWl0ZW1zLmxlbmd0aCkge1xuICAgICAgdGhpcy5hZGRDb250ZW50KHtcbiAgICAgICAgdGV4dDogJ05vIHJlc3VsdHMgbWF0Y2ggeW91ciBzZWFyY2ggY3JpdGVyaWEnLFxuICAgICAgICBzdHlsZTogJ3N0YW5kYXJkJyxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgY29uc3QgdGFibGVIZWFkZXIgPSBjb2x1bW5zLm1hcChjb2x1bW4gPT4ge1xuICAgICAgcmV0dXJuIHsgdGV4dDogY29sdW1uLmxhYmVsLCBzdHlsZTogJ3doaXRlQ29sb3InLCBib3JkZXI6IFswLCAwLCAwLCAwXSB9O1xuICAgIH0pO1xuXG4gICAgY29uc3QgdGFibGVSb3dzID0gaXRlbXMubWFwKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgcmV0dXJuIGNvbHVtbnMubWFwKGNvbHVtbiA9PiB7XG4gICAgICAgIGNvbnN0IGNlbGxWYWx1ZSA9IGl0ZW1bY29sdW1uLmlkXTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0ZXh0OiB0eXBlb2YgY2VsbFZhbHVlICE9PSAndW5kZWZpbmVkJyA/IGNlbGxWYWx1ZSA6ICctJyxcbiAgICAgICAgICBzdHlsZTogJ3N0YW5kYXJkJyxcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gMzg1IGlzIHRoZSBtYXggaW5pdGlhbCB3aWR0aCBwZXIgY29sdW1uXG4gICAgbGV0IHRvdGFsTGVuZ3RoID0gY29sdW1ucy5sZW5ndGggLSAxO1xuICAgIGNvbnN0IHdpZHRoQ29sdW1uID0gMzg1IC8gdG90YWxMZW5ndGg7XG4gICAgbGV0IHRvdGFsV2lkdGggPSB0b3RhbExlbmd0aCAqIHdpZHRoQ29sdW1uO1xuXG4gICAgY29uc3Qgd2lkdGhzOiBudW1iZXJbXSA9IFtdO1xuXG4gICAgZm9yIChsZXQgc3RlcCA9IDA7IHN0ZXAgPCBjb2x1bW5zLmxlbmd0aCAtIDE7IHN0ZXArKykge1xuICAgICAgbGV0IGNvbHVtbkxlbmd0aCA9IHRoaXMuZ2V0Q29sdW1uV2lkdGgoY29sdW1uc1tzdGVwXSwgdGFibGVSb3dzLCBzdGVwKTtcblxuICAgICAgaWYgKGNvbHVtbkxlbmd0aCA8PSBNYXRoLnJvdW5kKHRvdGFsV2lkdGggLyB0b3RhbExlbmd0aCkpIHtcbiAgICAgICAgd2lkdGhzLnB1c2goY29sdW1uTGVuZ3RoKTtcbiAgICAgICAgdG90YWxXaWR0aCAtPSBjb2x1bW5MZW5ndGg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3aWR0aHMucHVzaChNYXRoLnJvdW5kKHRvdGFsV2lkdGggLyB0b3RhbExlbmd0aCkpO1xuICAgICAgICB0b3RhbFdpZHRoIC09IE1hdGgucm91bmQodG90YWxXaWR0aCAvIHRvdGFsTGVuZ3RoKTtcbiAgICAgIH1cbiAgICAgIHRvdGFsTGVuZ3RoLS07XG4gICAgfVxuICAgIHdpZHRocy5wdXNoKCcqJyk7XG5cbiAgICB0aGlzLmFkZENvbnRlbnQoe1xuICAgICAgZm9udFNpemU6IDgsXG4gICAgICB0YWJsZToge1xuICAgICAgICBoZWFkZXJSb3dzOiAxLFxuICAgICAgICB3aWR0aHMsXG4gICAgICAgIGJvZHk6IFt0YWJsZUhlYWRlciwgLi4udGFibGVSb3dzXSxcbiAgICAgIH0sXG4gICAgICBsYXlvdXQ6IHtcbiAgICAgICAgZmlsbENvbG9yOiBpID0+IChpID09PSAwID8gQ09MT1JTLlBSSU1BUlkgOiBudWxsKSxcbiAgICAgICAgaExpbmVDb2xvcjogKCkgPT4gQ09MT1JTLlBSSU1BUlksXG4gICAgICAgIGhMaW5lV2lkdGg6ICgpID0+IDEsXG4gICAgICAgIHZMaW5lV2lkdGg6ICgpID0+IDAsXG4gICAgICB9LFxuICAgIH0pLmFkZE5ld0xpbmUoKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGFkZExpc3Qoe1xuICAgIHRpdGxlLFxuICAgIGxpc3QsXG4gIH06IHtcbiAgICB0aXRsZTogc3RyaW5nIHwgeyB0ZXh0OiBzdHJpbmc7IHN0eWxlOiBzdHJpbmcgfTtcbiAgICBsaXN0OiAoc3RyaW5nIHwgeyB0ZXh0OiBzdHJpbmc7IHN0eWxlOiBzdHJpbmcgfSlbXTtcbiAgfSkge1xuICAgIHJldHVybiB0aGlzLmFkZENvbnRlbnRXaXRoTmV3TGluZShcbiAgICAgIHR5cGVvZiB0aXRsZSA9PT0gJ3N0cmluZycgPyB7IHRleHQ6IHRpdGxlLCBzdHlsZTogJ2gyJyB9IDogdGl0bGUsXG4gICAgKVxuICAgICAgLmFkZENvbnRlbnQoeyB1bDogbGlzdC5maWx0ZXIoZWxlbWVudCA9PiBlbGVtZW50KSB9KVxuICAgICAgLmFkZE5ld0xpbmUoKTtcbiAgfVxuXG4gIGFkZE5ld0xpbmUoKSB7XG4gICAgcmV0dXJuIHRoaXMuYWRkQ29udGVudCh7IHRleHQ6ICdcXG4nIH0pO1xuICB9XG5cbiAgYWRkQ29udGVudFdpdGhOZXdMaW5lKHRpdGxlOiBhbnkpIHtcbiAgICByZXR1cm4gdGhpcy5hZGRDb250ZW50KHRpdGxlKS5hZGROZXdMaW5lKCk7XG4gIH1cblxuICBhZGRBZ2VudHNGaWx0ZXJzKGFnZW50cykge1xuICAgIHRoaXMubG9nZ2VyLmRlYnVnKFxuICAgICAgYFN0YXJ0ZWQgdG8gcmVuZGVyIHRoZSBhdXRob3JpemVkIGFnZW50cyBmaWx0ZXJzOiBhZ2VudHM6ICR7YWdlbnRzfWAsXG4gICAgKTtcblxuICAgIHRoaXMuYWRkTmV3TGluZSgpO1xuXG4gICAgdGhpcy5hZGRDb250ZW50KHtcbiAgICAgIHRleHQ6ICdOT1RFOiBUaGlzIHJlcG9ydCBvbmx5IGluY2x1ZGVzIHRoZSBhdXRob3JpemVkIGFnZW50cyBvZiB0aGUgdXNlciB3aG8gZ2VuZXJhdGVkIHRoZSByZXBvcnQnLFxuICAgICAgc3R5bGU6IHsgZm9udFNpemU6IDEwLCBjb2xvcjogQ09MT1JTLlBSSU1BUlkgfSxcbiAgICAgIG1hcmdpbjogWzAsIDAsIDAsIDVdLFxuICAgIH0pO1xuXG4gICAgLypUT0RPOiBUaGlzIHdpbGwgYmUgZW5hYmxlZCBieSBhIGNvbmZpZyovXG4gICAgLyogdGhpcy5hZGRDb250ZW50KHtcbiAgICAgIGZvbnRTaXplOiA4LFxuICAgICAgdGFibGU6IHtcbiAgICAgICAgd2lkdGhzOiBbJyonXSxcbiAgICAgICAgYm9keTogW1xuICAgICAgICAgIFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgY29sdW1uczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHN2ZzogZmlsdGVySWNvblJhdyxcbiAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMCxcbiAgICAgICAgICAgICAgICAgIGhlaWdodDogMTAsXG4gICAgICAgICAgICAgICAgICBtYXJnaW46IFs0MCwgNiwgMCwgMF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHRleHQ6IGBBZ2VudCBJRHM6ICR7YWdlbnRzfWAgfHwgJy0nLFxuICAgICAgICAgICAgICAgICAgbWFyZ2luOiBbNDMsIDAsIDAsIDBdLFxuICAgICAgICAgICAgICAgICAgc3R5bGU6IHsgZm9udFNpemU6IDgsIGNvbG9yOiAnIzMzMycgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIG1hcmdpbjogWy00MCwgMCwgLTQwLCAwXSxcbiAgICAgIGxheW91dDoge1xuICAgICAgICBmaWxsQ29sb3I6ICgpID0+IG51bGwsXG4gICAgICAgIGhMaW5lV2lkdGg6ICgpID0+IDAsXG4gICAgICAgIHZMaW5lV2lkdGg6ICgpID0+IDBcbiAgICAgIH1cbiAgICB9KTsgKi9cblxuICAgIHRoaXMuYWRkQ29udGVudCh7IHRleHQ6ICdcXG4nIH0pO1xuICAgIHRoaXMubG9nZ2VyLmRlYnVnKCdUaW1lIHJhbmdlIGFuZCBmaWx0ZXJzIHJlbmRlcmVkJyk7XG4gIH1cblxuICBhc3luYyBwcmludChyZXBvcnRQYXRoOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgLy8gR2V0IGNvbmZpZ3VyYXRpb24gc2V0dGluZ3NcbiAgICAgIHRoaXMuY29uZmlndXJhdGlvblxuICAgICAgICAuZ2V0Q3VzdG9taXphdGlvblNldHRpbmcoXG4gICAgICAgICAgJ2N1c3RvbWl6YXRpb24ubG9nby5yZXBvcnRzJyxcbiAgICAgICAgICAnY3VzdG9taXphdGlvbi5yZXBvcnRzLmhlYWRlcicsXG4gICAgICAgICAgJ2N1c3RvbWl6YXRpb24ucmVwb3J0cy5mb290ZXInLFxuICAgICAgICApXG4gICAgICAgIC50aGVuKGNvbmZpZ3VyYXRpb24gPT4ge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICAgICdjdXN0b21pemF0aW9uLmxvZ28ucmVwb3J0cyc6IHBhdGhUb0xvZ28sXG4gICAgICAgICAgICAgICdjdXN0b21pemF0aW9uLnJlcG9ydHMuaGVhZGVyJzogcGFnZUhlYWRlcixcbiAgICAgICAgICAgICAgJ2N1c3RvbWl6YXRpb24ucmVwb3J0cy5mb290ZXInOiBwYWdlRm9vdGVyLFxuICAgICAgICAgICAgfSA9IGNvbmZpZ3VyYXRpb247XG4gICAgICAgICAgICBjb25zdCBkb2N1bWVudCA9IHRoaXMuX3ByaW50ZXIuY3JlYXRlUGRmS2l0RG9jdW1lbnQoe1xuICAgICAgICAgICAgICAuLi5wYWdlQ29uZmlndXJhdGlvbih7IHBhdGhUb0xvZ28sIHBhZ2VIZWFkZXIsIHBhZ2VGb290ZXIgfSksXG4gICAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXMuX2NvbnRlbnQsXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZG9jdW1lbnQub24oJ2Vycm9yJywgcmVqZWN0KTtcbiAgICAgICAgICAgIGRvY3VtZW50Lm9uKCdlbmQnLCByZXNvbHZlKTtcblxuICAgICAgICAgICAgZG9jdW1lbnQucGlwZShmcy5jcmVhdGVXcml0ZVN0cmVhbShyZXBvcnRQYXRoKSk7XG4gICAgICAgICAgICBkb2N1bWVudC5lbmQoKTtcbiAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHdpZHRoIG9mIGEgZ2l2ZW4gY29sdW1uXG4gICAqXG4gICAqIEBwYXJhbSBjb2x1bW5cbiAgICogQHBhcmFtIHRhYmxlUm93c1xuICAgKiBAcGFyYW0gc3RlcFxuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgKi9cbiAgZ2V0Q29sdW1uV2lkdGgoY29sdW1uLCB0YWJsZVJvd3MsIGluZGV4KSB7XG4gICAgY29uc3Qgd2lkdGhDaGFyYWN0ZXIgPSA1OyAvL21pbiB3aWR0aCBwZXIgY2hhcmFjdGVyXG5cbiAgICAvL0dldCB0aGUgbG9uZ2VzdCByb3cgdmFsdWVcbiAgICBjb25zdCBtYXhSb3dMZW5ndGggPSB0YWJsZVJvd3MucmVkdWNlKChtYXhMZW5ndGgsIHJvdykgPT4ge1xuICAgICAgcmV0dXJuIHJvd1tpbmRleF0udGV4dC5sZW5ndGggPiBtYXhMZW5ndGhcbiAgICAgICAgPyByb3dbaW5kZXhdLnRleHQubGVuZ3RoXG4gICAgICAgIDogbWF4TGVuZ3RoO1xuICAgIH0sIDApO1xuXG4gICAgLy9HZXQgY29sdW1uIG5hbWUgbGVuZ3RoXG4gICAgY29uc3QgaGVhZGVyTGVuZ3RoID0gY29sdW1uLmxhYmVsLmxlbmd0aDtcblxuICAgIC8vVXNlIHRoZSBsb25nZXN0IHRvIGdldCB0aGUgY29sdW1uIHdpZHRoXG4gICAgY29uc3QgbWF4TGVuZ3RoID0gbWF4Um93TGVuZ3RoID4gaGVhZGVyTGVuZ3RoID8gbWF4Um93TGVuZ3RoIDogaGVhZGVyTGVuZ3RoO1xuXG4gICAgcmV0dXJuIG1heExlbmd0aCAqIHdpZHRoQ2hhcmFjdGVyO1xuICB9XG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQUFBLEdBQUEsR0FBQUMsc0JBQUEsQ0FBQUMsT0FBQTtBQUNBLElBQUFDLEtBQUEsR0FBQUYsc0JBQUEsQ0FBQUMsT0FBQTtBQUNBLElBQUFFLFFBQUEsR0FBQUgsc0JBQUEsQ0FBQUMsT0FBQTtBQUNBLElBQUFHLGFBQUEsR0FBQUosc0JBQUEsQ0FBQUMsT0FBQTtBQUNBLElBQUFJLGNBQUEsR0FBQUwsc0JBQUEsQ0FBQUMsT0FBQTtBQUNBLElBQUFLLE9BQUEsR0FBQUMsdUJBQUEsQ0FBQU4sT0FBQTtBQUNBLElBQUFPLFVBQUEsR0FBQVAsT0FBQTtBQUFrRSxTQUFBUSx5QkFBQUMsQ0FBQSw2QkFBQUMsT0FBQSxtQkFBQUMsQ0FBQSxPQUFBRCxPQUFBLElBQUFFLENBQUEsT0FBQUYsT0FBQSxZQUFBRix3QkFBQSxZQUFBQSxDQUFBQyxDQUFBLFdBQUFBLENBQUEsR0FBQUcsQ0FBQSxHQUFBRCxDQUFBLEtBQUFGLENBQUE7QUFBQSxTQUFBSCx3QkFBQUcsQ0FBQSxFQUFBRSxDQUFBLFNBQUFBLENBQUEsSUFBQUYsQ0FBQSxJQUFBQSxDQUFBLENBQUFJLFVBQUEsU0FBQUosQ0FBQSxlQUFBQSxDQUFBLHVCQUFBQSxDQUFBLHlCQUFBQSxDQUFBLFdBQUFLLE9BQUEsRUFBQUwsQ0FBQSxRQUFBRyxDQUFBLEdBQUFK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