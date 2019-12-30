package com.xulin.user.entity;

import com.baomidou.mybatisplus.annotation.*;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import javax.validation.constraints.*;
import java.sql.Timestamp;

@Data
@TableName("user")
public class User {

    //id
    @TableId(value = "id",type = IdType.AUTO)
    private Integer id;

    //姓名
    @NotBlank(message="姓名不能为空")
    private String name;

    //性别
    private String gender;

    //邮箱
    @Email
    private String email;

    //年龄
    @DecimalMax("999")
    @DecimalMin("0")
    private Integer age;

    //创建时间
    private Timestamp createDate;
}
