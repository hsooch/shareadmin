package test.shared.university.admin.dao;

import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Map;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.google.common.collect.Maps;

import shared.university.admin.UMap;
import shared.university.admin.dao.SemesterDao;
import shared.university.admin.dao.UserDao;
import test.shared.university.admin.TestCommon;

/**
 * Created on 2018. 4. 4.
 *
 * @author 스퀘어네트(최성헌)
 * @since JDK1.7
 */
@Slf4j
public class TestUserDao extends TestCommon {

    @Autowired
    private SemesterDao semesterDao;

    @Test
    public void testGetUserCount() {

        //log.debug("result => {}", userDao.getUserCount());
    }
    
    @SuppressWarnings("rawtypes")
	@Test
    public void testGetSemesterListWithGuide(){
    	Map<String, Object> paramMap = Maps.newHashMap();
        paramMap.put("univCode", "UNI02001001");
        paramMap.put("isPaging", "N");
        List<UMap> list = semesterDao.getSemesterListWithGuide(paramMap);
        for(UMap info:list){
        	log.debug("uMapInfo => {}", info.toString());
        }
    }
}
