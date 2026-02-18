using ClosedXML.Excel;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Data.OleDb;
using System.Data.SqlClient;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using LicenseContext = OfficeOpenXml.LicenseContext;

namespace Insert_Data_Online_Server
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
        }



        private void ImportExcelToDatabase()
        {

            try
            {
                string excelPath = TxtExcelPath.Text.Trim();



                List<string> insertStatements = new List<string>();

                using (var workbook = new XLWorkbook(excelPath))
                {
                    var worksheet = workbook.Worksheet(1);
                    bool firstRow = true;
                    List<string> columnNames = new List<string>();

                    foreach (var row in worksheet.RowsUsed())
                    {
                        if (firstRow)
                        {
                            // جمع أسماء الأعمدة
                            foreach (var cell in row.Cells())
                            {
                                columnNames.Add(cell.Value.ToString().Trim());
                            }
                            firstRow = false;
                        }
                        else
                        {
                            List<string> values = new List<string>();
                            foreach (var cell in row.Cells())
                            {
                                // الهروب من الفواصل الأحادية داخل النصوص
                                string val = cell.Value.ToString().Replace("'", "''");
                                values.Add("N'" + val + "'");
                            }

                            string insertSql = $"INSERT INTO {TxtNameTable.Text.Trim()} ({string.Join(",", columnNames)}) VALUES ({string.Join(",", values)});";
                            insertStatements.Add(insertSql);
                        }
                    }
                }



                // 3. إرسال البيانات إلى SQL
                string sqlConnStr = TxtSqlConnStr.Text.Trim(); ;

                using (SqlConnection sqlConn = new SqlConnection(sqlConnStr))
                {
                    sqlConn.Open();
                    foreach (string sql in insertStatements)
                    {
                        using (SqlCommand cmd = new SqlCommand(sql, sqlConn))
                        {
                            cmd.ExecuteNonQuery();
                        }
                    }
                }


                MessageBox.Show("✅ تم رفع البيانات بنجاح.");
            }
            catch (Exception ex)
            {
                MessageBox.Show("❌ خطأ: " + ex.Message);
            }
        }

        private void button1_Click(object sender, EventArgs e)
        {
            ImportExcelToDatabase();

        }
    }
}
