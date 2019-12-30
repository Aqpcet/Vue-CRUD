package com.xulin.user.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.xulin.user.dao.UserDao;
import com.xulin.user.entity.User;
import com.xulin.user.service.UserServer;
import org.springframework.stereotype.Service;

@Service("vueServer")
public class UserServerImpl extends ServiceImpl<UserDao, User> implements UserServer {
}
