package com.javaapppractice.ankenkanri_system;

public class RegisterRequest {
    private String title;
    private String customer;
    private String description;
    private String syain;
    private String eigyo;
    private String type;

    // ゲッター & セッター
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCustomer() { return customer; }
    public void setCustomer(String customer) { this.customer = customer; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getSyain() { return syain; }
    public void setSyain(String syain) { this.syain = syain; }

    public String getEigyo() { return eigyo; }
    public void setEigyo(String eigyo) { this.eigyo = eigyo; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
}

