package com.javaapppractice.ankenkanri_system;

import java.sql.Connection;
import java.sql.SQLException;

public class DatabaseConnection {
    private static final String URL = "jdbc:mysql://localhost:3306/customer_db?useSSL=false&serverTimezone=UTC";
    private static final String USER = "root";  // MySQLのユーザー名を指定
    private static final String PASSWORD = "902k799mMac";  // MySQLのパスワードを指定

    public static Connection getConnection() throws SQLException {
        return java.sql.DriverManager.getConnection(URL, USER, PASSWORD);
    }

    // 🔹 テスト用 main メソッド
    public static void main(String[] args) {
        try (Connection conn = DatabaseConnection.getConnection()) {
            if (conn != null) {
                System.out.println("データベース接続成功！");
            }
        } catch (SQLException e) {
            e.printStackTrace();
            System.out.println("データベース接続失敗！");
        }
    }
}
