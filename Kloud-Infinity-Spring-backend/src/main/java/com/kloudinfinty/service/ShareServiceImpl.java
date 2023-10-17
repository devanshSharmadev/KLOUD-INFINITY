package com.kloudinfinty.service;

import com.kloudinfinty.model.Shared;
import com.kloudinfinty.repositories.ShareRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ShareServiceImpl implements IShareService{

    @Autowired
    ShareRepository shareRepository;

    @Override
    public void add(Shared shared) {
        shareRepository.insert(shared);
    }

    @Override
    public Shared getById(String id) {
        return shareRepository.getById(id);
    }

    @Override
    public String getIdByUsernameAndFileId(String username,String fileId) {
        Shared shared = shareRepository.findByToUserAndFileId(username, fileId);
        System.out.println(shared.getId());
        return  shared.getId();
    }
}
