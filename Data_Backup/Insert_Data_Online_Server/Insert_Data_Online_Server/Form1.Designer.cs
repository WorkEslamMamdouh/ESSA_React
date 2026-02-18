namespace Insert_Data_Online_Server
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.button1 = new System.Windows.Forms.Button();
            this.TxtExcelPath = new System.Windows.Forms.TextBox();
            this.TxtSqlConnStr = new System.Windows.Forms.TextBox();
            this.label1 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.TxtNameTable = new System.Windows.Forms.TextBox();
            this.label3 = new System.Windows.Forms.Label();
            this.SuspendLayout();
            // 
            // button1
            // 
            this.button1.BackColor = System.Drawing.Color.Green;
            this.button1.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.button1.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(224)))), ((int)(((byte)(224)))), ((int)(((byte)(224)))));
            this.button1.Location = new System.Drawing.Point(220, 196);
            this.button1.Name = "button1";
            this.button1.Size = new System.Drawing.Size(568, 52);
            this.button1.TabIndex = 0;
            this.button1.Text = "Sand Data";
            this.button1.UseVisualStyleBackColor = false;
            this.button1.Click += new System.EventHandler(this.button1_Click);
            // 
            // TxtExcelPath
            // 
            this.TxtExcelPath.Location = new System.Drawing.Point(220, 96);
            this.TxtExcelPath.Multiline = true;
            this.TxtExcelPath.Name = "TxtExcelPath";
            this.TxtExcelPath.Size = new System.Drawing.Size(568, 31);
            this.TxtExcelPath.TabIndex = 1;
            this.TxtExcelPath.Text = "D:\\_Work\\ESSA_ERP\\Data_Backup\\Inser_Data.xlsx";
            // 
            // TxtSqlConnStr
            // 
            this.TxtSqlConnStr.Location = new System.Drawing.Point(220, 37);
            this.TxtSqlConnStr.Multiline = true;
            this.TxtSqlConnStr.Name = "TxtSqlConnStr";
            this.TxtSqlConnStr.Size = new System.Drawing.Size(568, 46);
            this.TxtSqlConnStr.TabIndex = 2;
            this.TxtSqlConnStr.Text = "Data Source=SQL6032.site4now.net;Initial Catalog=db_ab23c2_essa;User Id=db_ab23c2" +
    "_essa_admin;Password=ESSA2025;";
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label1.Location = new System.Drawing.Point(32, 97);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(170, 25);
            this.label1.TabIndex = 3;
            this.label1.Text = "Path url  Excel : ";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label2.Location = new System.Drawing.Point(32, 37);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(181, 25);
            this.label2.TabIndex = 4;
            this.label2.Text = "Conntion String : ";
            // 
            // TxtNameTable
            // 
            this.TxtNameTable.Location = new System.Drawing.Point(220, 143);
            this.TxtNameTable.Multiline = true;
            this.TxtNameTable.Name = "TxtNameTable";
            this.TxtNameTable.Size = new System.Drawing.Size(568, 31);
            this.TxtNameTable.TabIndex = 5;
            this.TxtNameTable.Text = "D_I_Items";
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label3.Location = new System.Drawing.Point(32, 143);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(148, 25);
            this.label3.TabIndex = 6;
            this.label3.Text = "Name Table : ";
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.Silver;
            this.ClientSize = new System.Drawing.Size(800, 270);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.TxtNameTable);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.TxtSqlConnStr);
            this.Controls.Add(this.TxtExcelPath);
            this.Controls.Add(this.button1);
            this.Name = "Form1";
            this.Text = "Form1";
            this.Load += new System.EventHandler(this.Form1_Load);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Button button1;
        private System.Windows.Forms.TextBox TxtExcelPath;
        private System.Windows.Forms.TextBox TxtSqlConnStr;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.TextBox TxtNameTable;
        private System.Windows.Forms.Label label3;
    }
}

