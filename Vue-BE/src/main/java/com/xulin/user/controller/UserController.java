package com.xulin.user.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.xulin.user.entity.User;
import com.xulin.user.service.UserServer;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
public class UserController {

    @Resource
    public UserServer vueServer;

    /**
     *@MethodName find
     *@Description 条件查找
     *@Param [user]
     *@Return org.springframework.http.ResponseEntity<java.util.List<com.xulin.user.entity.User>>
     *@Author xulin
     *@Date 2019/12/28 下午12:15
     **/
    @GetMapping("find")
    public ResponseEntity<List<User>> find(User user){
        QueryWrapper<User> wrapper = new QueryWrapper<>() ;

        wrapper.eq(!StringUtils.isEmpty(user.getName()),"name",user.getName())
               .eq(!StringUtils.isEmpty(user.getGender()),"gender",user.getGender())
               .eq(!StringUtils.isEmpty(user.getCreateDate()),"create_date",user.getCreateDate());

        return ResponseEntity.ok(vueServer.list(wrapper));
    }

    //当前端页面传过来的的String类型的日期与后台实体类的Date类型不匹配时，需要加上该方法
    @InitBinder
    public void init(WebDataBinder binder) {
        binder.registerCustomEditor(Date.class,
                new CustomDateEditor(new SimpleDateFormat("yyyy-MM-dd"), true));
    }

    /**
     *@MethodName saveOrUpdate
     *@Description 保存或更新（json格式的参数）
     *@Param [user]
     *@Return org.springframework.http.ResponseEntity
     *@Author xulin
     *@Date 2019/12/28 下午10:29
     **/
    @PostMapping("saveOrUpdate")
    public ResponseEntity saveOrUpdate(@RequestBody @Validated User user){
        return ResponseEntity.ok(vueServer.saveOrUpdate(user));
    }

    /**
     *@MethodName deleteById
     *@Description 根据id删除
     *@Param [id]
     *@Return org.springframework.http.ResponseEntity
     *@Author xulin
     *@Date 2019/12/28 下午10:29
     **/
    @DeleteMapping("delete")
    public ResponseEntity deleteById(@RequestParam("id") Integer id){
        return ResponseEntity.ok(vueServer.removeById(id));
    }
}
