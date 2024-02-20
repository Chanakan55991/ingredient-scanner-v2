import { type OPSQLiteConnection, open } from "@op-engineering/op-sqlcipher";

class DB {
  db: OPSQLiteConnection;

  constructor(id: string, key: string) {
    this.db = open({
      name: "igsc_" + id,
      encryptionKey: key,
    });
    console.log(id, key);
  }

  public execute(sql: string, params?: any[] | undefined) {
    return this.db.execute(sql, params);
  }

  public init() {
    this.db.execute(`
    PRAGMA foreign_keys=OFF;
    BEGIN TRANSACTION;
    CREATE TABLE all_menus (id integer primary key autoincrement, menu_name text, ingredients_list text, receipe text, thumb_url TEXT, ts integer);
    CREATE TABLE history (id integer primary key autoincrement, menu_id integer, favorite integer, foreign key(menu_id) references all_menus(id));
    INSERT INTO all_menus VALUES(2,'Egg fried rice','[''chicken egg'']',replace('วัตถุดิบ\n1. ข้าวสวยหุงสุก 1 ถ้วย  - ที่นิยมใช้กันคือ ข้าวเสาไห้ และข้าวหอมมะลิ\n2. ไข่ไก่ 2 ฟอง  - หากใช้เป็นไข่เป็ดก็จะทำให้มีสีสันเข้มกว่าและได้รสชาติที่ดีไปอีกแบบ\n3. ต้นหอม 1 ช้อนโต๊ะ -  เพื่อเพิ่มสีสันให้กับจาน\n4. เกลือ ½ ช้อนชา - เพื่อปรุงรสให้ข้าวผัดไข่มีรสชาติที่กลมกล่อมมากขึ้นและทำให้ข้าวไม่แฉะ\n5. พริกไทย 1 ช้อนชา - เพื่อเพิ่มกลิ่นหอมและความเผ็ดร้อนให้กับตัวข้าวผัด\n6. น้ำมันพืช 3 ช้อนโต๊ะ - ควรใช้น้ำมันสำหรับผัด เช่น น้ำมันถั่วเหลือง \n\nวิธีทำ\n1. เทน้ำมันลงในกระทะ วนให้น้ำมันทั่วกระทะแล้วเทน้ำมันออก นำข้าวสวยมาผัดให้ข้าวร้อนและร่วน  \n2. ตอกไข่ลงแล้วผัดให้ไข่เคลือบเม็ดข้าวให้ทั่ว ผัดให้ไข่สุก แล้วข้าวสีเหลืองไข่สวยงาม\n3. ปรุงรสด้วยเกลือ และพริกไทย ใส่ต้นหอมซอย เพื่อเพิ่มความสวยงาม ','\n',char(10)),'https://images.aws.nestle.recipes/resized/16d4cde420f2a4f544df6549e8aea4c3_egg-fired-rice_944_531.jpeg',1708146539);
    INSERT INTO all_menus VALUES(3,'Pork fried rice','[''chicken egg'']',replace('วัตถุดิบ\n1. ข้าวสวยหุงสุก 1 ถ้วย  - ที่นิยมใช้กันคือ ข้าวเสาไห้ และข้าวหอมมะลิ\n2. ไข่ไก่ 2 ฟอง  - หากใช้เป็นไข่เป็ดก็จะทำให้มีสีสันเข้มกว่าและได้รสชาติที่ดีไปอีกแบบ\n3. ต้นหอม 1 ช้อนโต๊ะ -  เพื่อเพิ่มสีสันให้กับจาน\n4. เกลือ ½ ช้อนชา - เพื่อปรุงรสให้ข้าวผัดไข่มีรสชาติที่กลมกล่อมมากขึ้นและทำให้ข้าวไม่แฉะ\n5. พริกไทย 1 ช้อนชา - เพื่อเพิ่มกลิ่นหอมและความเผ็ดร้อนให้กับตัวข้าวผัด\n6. น้ำมันพืช 3 ช้อนโต๊ะ - ควรใช้น้ำมันสำหรับผัด เช่น น้ำมันถั่วเหลือง \n7. หมู 100 กรัม - หั่นให้เป็นชิ้นหรือสับ\n\nวิธีทำ\n1. เทน้ำมันลงในกระทะ วนให้น้ำมันทั่วกระทะแล้วเทน้ำมันออก นำข้าวสวยมาผัดให้ข้าวร้อนและร่วน  \n2. ตอกไข่ลงแล้วผัดให้ไข่เคลือบเม็ดข้าวให้ทั่ว จากนั้นใส่เนื้อหมูลงไปเพิ่มผัดให้สุก\n3. ปรุงรสด้วยเกลือ และพริกไทย ใส่ต้นหอมซอย เพื่อเพิ่มความสวยงาม ','\n',char(10)),'https://www.gimmesomeoven.com/wp-content/uploads/2012/11/pork-fried-rice-1.jpg',1708148410);
    INSERT INTO all_menus VALUES(4,'Beef fried rice','[''chicken egg'', ''beef'']',replace('วัตถุดิบ\n1. ข้าวสวยหุงสุก 1 ถ้วย  - ที่นิยมใช้กันคือ ข้าวเสาไห้ และข้าวหอมมะลิ\n2. ไข่ไก่ 2 ฟอง  - หากใช้เป็นไข่เป็ดก็จะทำให้มีสีสันเข้มกว่าและได้รสชาติที่ดีไปอีกแบบ\n3. ต้นหอม 1 ช้อนโต๊ะ -  เพื่อเพิ่มสีสันให้กับจาน\n4. เกลือ ½ ช้อนชา - เพื่อปรุงรสให้ข้าวผัดไข่มีรสชาติที่กลมกล่อมมากขึ้นและทำให้ข้าวไม่แฉะ\n5. พริกไทย 1 ช้อนชา - เพื่อเพิ่มกลิ่นหอมและความเผ็ดร้อนให้กับตัวข้าวผัด\n6. น้ำมันพืช 3 ช้อนโต๊ะ - ควรใช้น้ำมันสำหรับผัด เช่น น้ำมันถั่วเหลือง \n7. เนื้้อวัว 100 กรัม - หั่นให้เป็นชิ้นหรือสับ\n\nวิธีทำ\n1. เทน้ำมันลงในกระทะ วนให้น้ำมันทั่วกระทะแล้วเทน้ำมันออก นำข้าวสวยมาผัดให้ข้าวร้อนและร่วน  \n2. ตอกไข่ลงแล้วผัดให้ไข่เคลือบเม็ดข้าวให้ทั่ว จากนั้นใส่เนื้อวัวลงไปเพิ่มผัดให้สุก\n3. ปรุงรสด้วยเกลือ และพริกไทย ใส่ต้นหอมซอย เพื่อเพิ่มความสวยงาม ','\n',char(10)),'https://dfbkuy5licyr9.cloudfront.net/wp-content/uploads/2018/09/orange-beef-fried-rice-casserole.jpg?x39145',1708148494);
    INSERT INTO all_menus VALUES(5,'Ham fried rice','[''chicken egg'', ''ham'']',replace('วัตถุดิบ\n1. ข้าวสวยหุงสุก 1 ถ้วย  - ที่นิยมใช้กันคือ ข้าวเสาไห้ และข้าวหอมมะลิ\n2. ไข่ไก่ 2 ฟอง  - หากใช้เป็นไข่เป็ดก็จะทำให้มีสีสันเข้มกว่าและได้รสชาติที่ดีไปอีกแบบ\n3. ต้นหอม 1 ช้อนโต๊ะ -  เพื่อเพิ่มสีสันให้กับจาน\n4. เกลือ ½ ช้อนชา - เพื่อปรุงรสให้ข้าวผัดไข่มีรสชาติที่กลมกล่อมมากขึ้นและทำให้ข้าวไม่แฉะ\n5. พริกไทย 1 ช้อนชา - เพื่อเพิ่มกลิ่นหอมและความเผ็ดร้อนให้กับตัวข้าวผัด\n6. น้ำมันพืช 3 ช้อนโต๊ะ - ควรใช้น้ำมันสำหรับผัด เช่น น้ำมันถั่วเหลือง \n7. แฮม 100 กรัม - หั่นให้เป็นชิ้นหรือสับ\n\nวิธีทำ\n1. เทน้ำมันลงในกระทะ วนให้น้ำมันทั่วกระทะแล้วเทน้ำมันออก นำข้าวสวยมาผัดให้ข้าวร้อนและร่วน  \n2. ตอกไข่ลงแล้วผัดให้ไข่เคลือบเม็ดข้าวให้ทั่ว จากนั้นใสแฮมลงไปเพิ่มผัดให้สุก\n3. ปรุงรสด้วยเกลือ และพริกไทย ใส่ต้นหอมซอย เพื่อเพิ่มความสวยงาม ','\n',char(10)),'https://www.yellowblissroad.com/wp-content/uploads/2021/10/Ham-Fried-Rice-social-scaled.jpg',1708148525);
    INSERT INTO all_menus VALUES(6,'Cockle and potato stew','[''cockle'']',replace('ส่วนผสม:\n\n1.หอยนางรม (Cockles) - ปริมาณตามต้องการ\n2.มันฝรั่ง (Potatoes) - ปริมาณตามต้องการ\n3.น้ำมันพืชหรือน้ำมันมะกอก\n4.หัวหอมใหญ่ (Onion) - 1 หัว (ซอยหรือสับ)\n5.กระเทียม (Garlic) - 3-4 กลีบ (สับหรือบด)\n6.พริกไทยดำ (Black pepper)\n7.เกลือ (Salt)\n8.พริกจินดาสำหรับใส่ตามความชอบ\n9.น้ำซุปหรือน้ำซุปหอยนางรม (Stock or Cockle broth) - ปริมาณตามต้องการ\n10.ผักสดสำหรับเสิร์ฟ (Optional)\nวิธีทำ:\n\n1.ล้างหอยนางรมให้สะอาดด้วยน้ำให้ถูกล้างออกและเปิดลักษณะ\n2.ตั้งกระทะให้ร้อน ใส่น้ำมันพืชหรือน้ำมันมะกอกลงไป แล้วรอให้ร้อน\n3.ใส่หัวหอมใหญ่ (Onion) และกระเทียม (Garlic) ลงไปผัดจนหอม\n4.หลังจากนั้นใส่หอยนางรมลงไปผัดรวมกับหอมและกระเทียม และคนไปด้วยกัน\n5.เมื่อหอยนางรมเริ่มเปิด ใส่มันฝรั่งลงไปคลุกเคล้าให้เข้ากัน\n6.เติมน้ำซุปหรือน้ำซุปหอยนางรมลงไป คนให้เข้ากัน\n7.ปรุงรสด้วยเกลือและพริกไทยดำตามความชอบ\n8.ปิดฝาให้หม้อเคล็ดน้อยลง และค่อยๆ ต้มให้มันฝรั่งเริ่มนุ่ม\n9.เมื่อมันฝรั่งนุ่มแล้ว ตรวจสอบรสชาติและปรับตามความชอบ\n10.ตักใส่ชาม และโรยพริกจินดาหรือผักสดสำหรับเสิร์ฟ (ถ้ามี)\n11.เสิร์ฟร้อนๆ รับประทานคู่กับขนมปังหรือข้าวสวยร้อน ตามความชอบ','\n',char(10)),'https://th.bing.com/th/id/OIP.UfaFdm_FVq9gcv1hofLUNgHaKX?rs=1&pid=ImgDetMain',1708148853);
    INSERT INTO all_menus VALUES(7,'Pork Basil Fried Rice','[''chicken egg'']',replace('วัตถุดิบ\n1. ข้าวสวยหุงสุก 1 ถ้วย (ข้าวเสาไห้หรือข้าวหอมมะลิ)\n2. ไข่ไก่ 2 ฟอง (หรือไข่เป็ด)\n3. ต้นหอม 1 ช้อนโต๊ะ\n4. เกลือ ½ ช้อนชา\n5. พริกไทย 1 ช้อนชา\n6. น้ำมันพืช 3 ช้อนโต๊ะ (เช่น น้ำมันถั่วเหลือง)\n7. เนื้อหมู\n\nวิธีทำ\n1. นำกระทะไปตั้งไฟ ใส่น้ำมันพืชลงไป 3 ช้อนโต๊ะ แล้วรอให้ร้อน\n2. ผัดข้าวสวยที่ได้หุงสุกในน้ำมันร้อน ผัดให้เข้ากัน และราดเกลือลงไปเล็กน้อย เพื่อปรับรสชาติ\n3. พร้อมกับนี้ ตีไข่ไก่ 2 ฟองใส่ลงไปในกระทะที่มีข้าว ผัดให้ไข่เริ่มจับตัว\n4. เพิ่มเนื้อหมูลงไปผัดในกระทะ และผัดให้สุก\n5. ใส่ต้นหอมซอยลงไปผัดให้เข้ากัน และปรุงรสด้วยพริกไทย','\n',char(10)),'https://images.services.kitchenstories.io/MRxcM_KNscGAJaphGq57qFKQWJ8=/3840x0/filters:quality(85)/images.kitchenstories.io/wagtailOriginalImages/R2592-final-photo.jpg',1708149196);
    INSERT INTO all_menus VALUES(8,'Shrimp padthai','[''shrimp'', ''lime'', ''chicken egg'']',replace('ส่วนผสม:\n\n1.เส้นหมี่ขาวแห้ง (Pad Thai noodles) - ปริมาณ 200-250 กรัม\n2.กุ้ง (Shrimp) - ปริมาณ 200-250 กรัม (ล้างและถอดเส้นดำ)\n3.ไข่ - 1-2 ฟอง\n4.ถั่วงอก (Bean sprouts) - ปริมาณ 1 ถ้วย\n5.ต้นหอมซอย - ปริมาณตามต้องการ\n6.น้ำมันพืช - สำหรับผัด\n7.หอมใหญ่ (Shallots) - 2 หัว (สับ)\n8.กระเทียม (Garlic) - 3-4 กลีบ (สับ)\n9.น้ำตาลปี๊บ - 1-2 ช้อนโต๊ะ\n10.น้ำตาลทราย - 1-2 ช้อนชา\n11.ถั่วลิสงคั่วบด - 2-3 ช้อนโต๊ะ\n12.น้ำตาลทราย - 1-2 ช้อนชา\n13.น้ำปลา - 2-3 ช้อนโต๊ะ\n14.น้ำมะนาว - ปริมาณ 2-3 ช้อนโต๊ะ\n15.พริกไทยป่น - ตามชอบ\n16.น้ำมันหอย (optional) - 1-2 ช้อนชา\n17.มะนาวหั่นเป็นรูปแว่น - สำหรับเสิร์ฟ\n\nวิธีทำ:\n\n1.แช่เส้นหมี่ในน้ำร้อนให้นิ่มตามคำแนะนำบนบรรจุภัณฑ์ หรือประมาณ 20-30 นาที และล้างน้ำออก ตั้งข้างไว้\n2.ตั้งกระทะให้ร้อน ใส่น้ำมันพืชลงไป แล้วผัดหอมใหญ่ (Shallots) และกระเทียม (Garlic) จนหอม\n3.เพิ่มกุ้งลงไปผัดจนสุกเรียบร้อย\n4.พร้อมกับกุ้ง ใส่เส้นหมี่ที่แช่น้ำและต้มสุกลงไปผัดรวมกัน\n5.ใส่น้ำตาลปี๊บ, น้ำตาลทราย, และถั่วลิสงคั่วบดลงไปผัด\n6.เคลือบให้เข้ากันแล้วปิดไฟ\n7.ใส่ถั่วงอกลงไปผัดให้เข้ากัน ปรุงรสด้วยน้ำปลา น้ำมะนาว และพริกไทยป่น ตามความชอบ\n8.ในกระทะอื่น ค่อย ๆ คราดไข่ไปทั่วเส้นและกุ้ง แล้วทับเส้นหมี่ให้ทั่วกัน\n9.ตักใส่จาน โรยหัวหอมซอยลงไปบนเส้นหมี่\n10.เสิร์ฟพร้อมผักสด, มะนาวหั่น, และพริกไทยดำบด','\n',char(10)),'https://i2.wp.com/wellplated.com/wp-content/uploads/2016/11/Easy-Shrimp-Pad-Thai.jpg',1708149269);
    INSERT INTO all_menus VALUES(9,'Beef Basil Fried Rice','[''chicken egg'', ''beef'']',replace('วัตถุดิบ\n1. ข้าวสวยหุงสุก 1 ถ้วย (ข้าวเสาไห้หรือข้าวหอมมะลิ)\n2. ไข่ไก่ 2 ฟอง (หรือไข่เป็ด)\n3. ต้นหอม 1 ช้อนโต๊ะ\n4. เกลือ ½ ช้อนชา\n5. พริกไทย 1 ช้อนชา\n6. น้ำมันพืช 3 ช้อนโต๊ะ (เช่น น้ำมันถั่วเหลือง)\n7. เนื้อวัว\n\nวิธีทำ\n1. นำกระทะไปตั้งไฟ ใส่น้ำมันพืชลงไป 3 ช้อนโต๊ะ แล้วรอให้ร้อน\n2. ผัดข้าวสวยที่ได้หุงสุกในน้ำมันร้อน ผัดให้เข้ากัน และราดเกลือลงไปเล็กน้อย เพื่อปรับรสชาติ\n3. พร้อมกับนี้ ตีไข่ไก่ 2 ฟองใส่ลงไปในกระทะที่มีข้าว ผัดให้ไข่เริ่มจับตัว\n4. เพิ่มเนื้อวัวลงไปผัดในกระทะ และผัดให้สุก\n5. ใส่ต้นหอมซอยลงไปผัดให้เข้ากัน และปรุงรสด้วยพริกไทย','\n',char(10)),'https://cdn3.didevelop.com/public/cdn/533_7eb9c8bae8cd9fb905b3fc08a18fa8ce.jpg',1708149272);
    INSERT INTO all_menus VALUES(10,'Chicken Basil Fried Rice','[''chicken egg'', ''chicken'']',replace('วัตถุดิบ\n1. ข้าวสวยหุงสุก 1 ถ้วย (ข้าวเสาไห้หรือข้าวหอมมะลิ)\n2. ไข่ไก่ 2 ฟอง (หรือไข่เป็ด)\n3. ต้นหอม 1 ช้อนโต๊ะ\n4. เกลือ ½ ช้อนชา\n5. พริกไทย 1 ช้อนชา\n6. น้ำมันพืช 3 ช้อนโต๊ะ (เช่น น้ำมันถั่วเหลือง)\n7. เนื้อไก่\n\nวิธีทำ\n1. นำกระทะไปตั้งไฟ ใส่น้ำมันพืชลงไป 3 ช้อนโต๊ะ แล้วรอให้ร้อน\n2. ผัดข้าวสวยที่ได้หุงสุกในน้ำมันร้อน ผัดให้เข้ากัน และราดเกลือลงไปเล็กน้อย เพื่อปรับรสชาติ\n3. พร้อมกับนี้ ตีไข่ไก่ 2 ฟองใส่ลงไปในกระทะที่มีข้าว ผัดให้ไข่เริ่มจับตัว\n4. เพิ่มเนื้อไก่ลงไปผัดในกระทะ และผัดให้สุก\n5. ใส่ต้นหอมซอยลงไปผัดให้เข้ากัน และปรุงรสด้วยพริกไทย','\n',char(10)),'https://www.marionskitchen.com/wp-content/uploads/2019/05/Spicy-Chicken-Basil-Fried-Rice1.jpg',1708149545);
    INSERT INTO all_menus VALUES(11,'Chicken fried rice','[''chicken egg'', ''chicken'']',replace('วัตถุดิบ\n1. ข้าวสวยหุงสุก 1 ถ้วย  - ที่นิยมใช้กันคือ ข้าวเสาไห้ และข้าวหอมมะลิ\n2. ไข่ไก่ 2 ฟอง  - หากใช้เป็นไข่เป็ดก็จะทำให้มีสีสันเข้มกว่าและได้รสชาติที่ดีไปอีกแบบ\n3. ต้นหอม 1 ช้อนโต๊ะ -  เพื่อเพิ่มสีสันให้กับจาน\n4. เกลือ ½ ช้อนชา - เพื่อปรุงรสให้ข้าวผัดไข่มีรสชาติที่กลมกล่อมมากขึ้นและทำให้ข้าวไม่แฉะ\n5. พริกไทย 1 ช้อนชา - เพื่อเพิ่มกลิ่นหอมและความเผ็ดร้อนให้กับตัวข้าวผัด\n6. น้ำมันพืช 3 ช้อนโต๊ะ - ควรใช้น้ำมันสำหรับผัด เช่น น้ำมันถั่วเหลือง \n7. เนื้อไก่ 100 กรัม\n\nวิธีทำ\n1. เทน้ำมันลงในกระทะ วนให้น้ำมันทั่วกระทะแล้วเทน้ำมันออก นำข้าวสวยมาผัดให้ข้าวร้อนและร่วน  \n2. ตอกไข่ลงแล้วผัดให้ไข่เคลือบเม็ดข้าวให้ทั่วจากนั้นใส่เนื้อไก่ ผัดให้ไข่และเนื้อไก่ให้สุก\n3. ปรุงรสด้วยเกลือ และพริกไทย ใส่ต้นหอมซอย เพื่อเพิ่มความสวยงาม ','\n',char(10)),'https://lifeloveandgoodfood.com/wp-content/uploads/2023/03/chicken_fried_rice00032a-1200x1200-1.jpg',1708149906);
    INSERT INTO all_menus VALUES(12,'Crab avocado rolls','[''avocado'']',replace('วัตถุดิบ:\n\n1.แผ่นซองแป้งข้าวเหนียวหรือแผ่นซองกระดูกปลา\n2.ปูอัด (Crab meat) - ปริมาณตามต้องการ\n3.มะพร้าวน้ำหอม (Avocado) - 1 ลูก หั่นเป็นชิ้นบาง\n4.แตงกวา (Cucumber) - หั่นเป็นแซนด์วิชหรือแท่งบางๆ\n5.กุ้งแชบ๊วย (Shrimp) - ถ้าต้องการ (อาจจะใช้กุ้งต้มหรือกุ้งย่าง)\n6.ผักสดตามชอบ (เช่น ใบมะกรูด ผักชี หรือผักสลัด)\n \n\nขั้นตอน:\n\n1.หากใช้แผ่นซองกระดูกปลา ให้นำแผ่นนั้นมาแช่น้ำอุ่นให้นิ่ม\n2.วางแผ่นซองกระดูกปลาลงบนพื้นโต๊ะหรือจานแบน\n3.วางปูอัด (Crab meat) ลงที่กลางของแผ่นซอง\n4.วางชิ้นมะพร้าวน้ำหอม (Avocado) และแตงกวา (Cucumber) บนปูอัด\n5.หากต้องการใส่กุ้งแชบ๊วย (Shrimp) ให้วางกุ้งลงไปด้วย\n6.วางใบผักสดตามชอบลงไปด้วย\n7.พับด้านข้างของแผ่นซองเพื่อปิดส่วนข้างของวัตถุดิบ\n8.หลังจากนั้นเริ่มจับแผ่นซองและวัตถุดิบให้ตั้งตรง แล้วพับด้านบนและด้านล่างของแผ่นซองเข้าหากัน เพื่อปิดสนิท\n9.ทำซ้ำขั้นตอนเดียวกันกับวัตถุดิบที่เหลือ\n10.นำ Summer Rolls ที่ทำไว้วางลงในจานเสิร์ฟพร้อมทาน\nหมายเหตุ: สามารถเสิร์ฟพร้อมซอสและเครื่องปรุงเสิร์ฟเพิ่มเติมตามความชอบ เช่น น้ำจิ้มส้มตำหรือน้ำจิ้มสำหรับผักสด น้ำจิ้มน้ำส้มสำหรับทานไก่ หรือน้ำจิ้มพริกแกงปลา.\n','\n',char(10)),'https://th.bing.com/th/id/R.acf269a9586db76ae2c5caf502f3d202?rik=xD8PgTRvNOpdUw&riu=http%3a%2f%2fwww.savorytooth.com%2fwp-content%2fuploads%2f2016%2f08%2fsummer-roll-square1.jpg&ehk=SAm1VStMelHXoRAufvcO1B3amFpGHhNbg%2fHoEDLf93w%3d&risl=&pid=ImgRaw&r=0',1708149944);
    INSERT INTO all_menus VALUES(13,'Mango Chicken Curry','[''chicken'', ''mango'']',replace('ส่วนผสม:\n\n1.ปีกไก่หรืออื่น ๆ ที่ชอบ (ปริมาณตามต้องการ)\n2.มะม่วงสุก (หั่นเป็นชิ้นเล็กๆ)\n3.น้ำมันพืช\n4.หัวหอมใหญ่ (สับ)\n5.กระเทียม (สับ)\n6.พริกไทยและเกลือ\n7.ผงหรี่และเครื่องปรุงรส (ตามชอบ เช่น ผง curry)\n8.น้ำมันมะพร้าวหรือน้ำมันกะทิ\n9.น้ำปลา\n10.นมข้นจืด\n11.ใบมะกรูดซอย\n12.พริกชี้ฟ้าหั่นแว่น (สำหรับตกแต่ง)\n\nวิธีทำ:\n\n1.ทอดปีกไก่ในน้ำมันร้อนจนสุกเหลือง และนำออกจากกระทะ เก็บไว้ให้พักไว้ก่อน\n2.ในกระทะเดิม ใส่น้ำมันพืช หัวหอมใหญ่และกระเทียม ผัดจนหอม\n3.ใส่มะม่วงที่หั่นเป็นชิ้นลงไป และผัดให้มะม่วงเปลี่ยนสีเล็กน้อย\n4.ปรุงรสด้วยพริกไทยและเกลือตามความชอบ และตามด้วยผงหรี่และเครื่องปรุงรส\n5.เพิ่มน้ำมะพร้าวหรือน้ำมันกะทิลงไป และคนให้เข้ากัน\n6.ใส่ปีกไก่ที่ทอดไว้ลงไปผัดในน้ำซุปของคัรี่ คนให้เข้ากัน\n7.เติมน้ำปลาและนมข้นจืดลงไป และคนให้เข้ากันอีกครั้ง\n8.ตรวจสอบรสชาติ และปรับตามความชอบ โดยสามารถเพิ่มน้ำปลาหรือนมข้นจืดเพิ่มเติมได้ตามความเข้มข้นที่ต้องการ\n9.เมื่อเสร็จสิ้น ใส่ใบมะกรูดซอยลงไป และคนให้เข้ากัน\n10.เสิร์ฟ Mango Chicken Curry พร้อมกับพริกชี้ฟ้าหั่นแว่นและข้าวสวยร้อน หรือขนมปังก็ได้ตามความชอบ','\n',char(10)),'https://justeasyrecipes.com/wp-content/uploads/2016/04/Mango-Chicken-Curry.jpg',1708150193);
    INSERT INTO all_menus VALUES(14,'Tom Yum Kung','[''shrimp'', ''lime'']',replace('วัตถุดิบ\n1. กุ้งเปลือกออกแล้ว 500 กรัม\n2. น้ำมันพืช 2 ช้อนโต๊ะ\n3. หอมใหญ่ซอยหยาบ 1 หัว\n4. ตะไคร้ซอยละเอียด 2 ต้น\n5. ข่าซอยละเอียด 3 ช้อนโต๊ะ\n6. ใบมะกรูด 5-6 ใบ\n7. พริกขี้หนูสับหยาบ ตามชอบ (ตามความเผ็ดที่ต้องการ)\n8. น้ำตาลปี๊บ 1 ช้อนชา\n9. น้ำปลา 3 ช้อนโต๊ะ\n10. น้ำเปล่า 6 ถ้วย\n11. น้ำมะนาว 2-3 ช้อนโต๊ะ\n12. ใบโหระพาหรือผักชีซอย (สำหรับตกแต่ง)\n13. พริกชี้ฟ้าซอย (ตกแต่ง)\n\nวิธีทำ\n1. นำน้ำมันพืชใส่หม้อต้ม ตั้งไฟกลาง และรอให้ร้อน\n2. ใส่หอมใหญ่ ตะไคร้ ข่า ใบมะกรูด และพริกขี้หนูลงไปผัดจนหอม\n3. เพิ่มน้ำปลา น้ำตาลปี๊บ และน้ำเปล่าลงไป คนให้เข้ากัน และรอจนเดือด\n4. ใส่กุ้งลงไปในหม้อ คนให้เข้ากัน และรอจนกุ้งสุก (ประมาณ 2-3 นาที หรือจนกุ้งเปลี่ยนสี)\n5. เปิดไฟเต้านม เพิ่มน้ำมะนาวลงไป คลุกให้เข้ากัน และปรุงรสตามความชอบ\n6. เสริฟ์ต้มยำกุ้งทันที ตกแต่งด้วยใบโหระพาหรือผักชีซอย และพริกชี้ฟ้าซอย','\n',char(10)),'https://hot-thai-kitchen.com/wp-content/uploads/2013/03/tom-yum-goong-blog.jpg',1708150653);
    INSERT INTO all_menus VALUES(15,'Oysters Rockefeller ','[''oyster'']',replace('ส่วนผสม:\n\n1.หอยนางรม (Oysters) - 6-12 ตัว (ขึ้นอยู่กับขนาดของหอย)\n2.น้ำมันมะกอกหรือน้ำมันพืช\n3.เนย (Butter) - 2 ช้อนโต๊ะ\n4.กระเทียม (Garlic) - 2-3 กลีบ (สับ)\n5.น้ำผึ้ง (Honey) - 1 ช้อนชา\n6.ผักชี (Parsley) - ประมาณ 2 ช้อนโต๊ะ (สับ)\n7.ซอสเปรี้ยว (Worcestershire sauce) - 1 ช้อนชา\n8.พริกไทยดำ (Black pepper) - ตามความชอบ\n9.เกลือ (Salt) - ตามความชอบ\n10.ชีส Parmesan - ประมาณ 1/4 ถ้วย (ขูด)\n11.น้ำแข็ง\n\nวิธีทำ:\n\n1.จัดน้ำแข็งไว้ในชามเพื่อนำไปใส่หอยนางรมเพื่อรักษาความสดชื่น\n2.ตั้งเตาให้ร้อนพอเท่า และนำกระทะมาใส่น้ำมันมะกอกหรือน้ำมันพืชลงไป\n3.ผ่าหอยนางรมเพื่อเปิดเปลือก โดยใช้มีดหรือเครื่องมือที่คมครั้ง เพื่อเปิดเป็นครึ่ง\n4.นำหอยที่เปิดแล้วไปวางในน้ำแข็งเพื่อรักษาความสดชื่น\n5.ใส่เนยลงในกระทะและตั้งไฟอ่อน ๆ รอให้เนยละลาย\n6.ใส่กระเทียมลงในกระทะ และผัดจนกระเทียมมีกลิ่นหอม\n7.เพิ่มน้ำผึ้ง ซอสเปรี้ยว และพาร์สลีย์ลงในกระทะ คนผสมให้เข้ากัน\n8.นำหอยนางรมที่เปิดแล้วมาวางลงในกระทะ ปรุงรสด้วยเกลือและพริกไทยดำตามความชอบ\n9.คนผสมให้เข้ากัน และต้มจนหอยนางรมเริ่มเป็นสีขาว\n10.นำหอยนางรมไปวางในถาดเติมด้วยชีส Parmesan ที่ขูดบนสุด\n11.นำหอยนางรมที่ตกแต่งด้วยชีส Parmesan ไปอบในเตากาแฟเพื่อให้ชีสเริ่มเป็นสีทอง\n12.เมื่อชีสเริ่มเหลือง ๆ แล้ว นำออกจากเตากาแฟและเสิร์ฟทันที\n','\n',char(10)),'https://th.bing.com/th/id/OIP.CRXBqd5aydIhRCQnEWGcYQHaLH?w=700&h=1050&rs=1&pid=ImgDetMain',1708150818);
    INSERT INTO all_menus VALUES(16,'Green Chicken Curry ','[''chicken'', ''coconut'']',replace('วัตถุดิบ\n1. เนื้อไก่หั่นชิ้นเล็ก ๆ 500 กรัม\n2. น้ำมะพร้าว 1 ถ้วย\n3. ใบมะกรูดซอย 2 ช้อนโต๊ะ\n4. มะเขือเทศเขียวหั่นเป็นชิ้น 1 ถ้วย\n5. กะทิ 1 ถ้วย\n6. พริกขี้หนูเขียวสด 5-10 เม็ด (ตามความเผ็ดที่ต้องการ)\n7. หอมแดงซอย 1/4 ถ้วย\n8. กระเทียมสับ 2 ช้อนโต๊ะ\n9. น้ำปลา 3 ช้อนโต๊ะ\n10. น้ำตาลปี๊บ 1 ช้อนโต๊ะ\n11. ใบมะกรูดซอย 2 ใบ (สำหรับตกแต่ง)\n12. พริกชี้ฟ้าแดงซอย (ตามความชอบ)\n\nวิธีทำ\n1. นำพริกขี้หนูเขียวสดและใบมะกรูดซอยมาปั่นให้ละเอียดพร้อมกัน\n2. นำกะทิไปต้มให้เดือดบนเตาหรือกระทะย่างให้เดือด จากนั้นใส่พริกขี้หนูเขียวสดและใบมะกรูดที่ปั่นลงไป คนให้เข้ากัน\n3. เพิ่มน้ำมะพร้าวลงไป คนให้เข้ากัน และตั้งไฟให้เป็นอย่างต่ำ\n4. ใส่เนื้อไก่ลงไป คนให้เข้ากัน และปรุงรสด้วยน้ำปลาและน้ำตาลปี๊บ\n5. ใส่มะเขือเทศเขียว หอมแดง และกระเทียมสับลงไป คนให้เข้ากันและต้มจนเนื้อไก่สุก\n6. ปิดไฟและตักใส่ชาม โรยใบมะกรูดซอยและพริกชี้ฟ้าแดงซอยลงไป\n7. นำมาเสิร์ฟร้อน รับประทานคู่กับข้าวสวยร้อน ๆ','\n',char(10)),'https://img.taste.com.au/UKiQeHLe/taste/2016/11/green-chicken-curry-94280-1.jpeg',1708151044);
    INSERT INTO all_menus VALUES(17,'Coconut Red Curry Mussels','[''mussels'', ''coconut'', ''lime'']',replace('ส่วนผสม:\n\n1.หอยนางรม (Mussels) - ปริมาณตามต้องการ (ล้างให้สะอาดและกำจัดหอยที่แตกหัก)\n2.น้ำมันพืชหรือน้ำมันมะกอก\n3.หัวหอมใหญ่ (Onion) - 1 หัว (ซอย)\n4.กระเทียม (Garlic) - 3-4 กลีบ (สับ)\n5.พริกชี้ฟ้าแดง (Red bell pepper) - 1-2 เม็ด (หั่นเป็นชิ้นเล็ก)\n6.พริกขี้หนูแดง (Red chili) - 1-2 เม็ด (ซอย)\n7.พริกแกงเผ็ด (Red curry paste) - 2-3 ช้อนโต๊ะ\n8.น้ำมะพร้าว (Coconut milk) - 1-2 ถ้วย\n9.น้ำตาลปี๊บ (Palm sugar) - 1-2 ช้อนชา\n10.ใบมะกรูด (Kaffir lime leaves) - 2-3 ใบ\n11.น้ำปลา (Fish sauce) - 1-2 ช้อนโต๊ะ\n12.น้ำมะนาว (Lime juice) - จำนวนตามความชอบ\n13.ผักชีฝรั่ง (Coriander leaves) - สำหรับตกแต่ง (ตามความชอบ)\n\nวิธีทำ:\n\n1.ตั้งกระทะให้ร้อนและเทน้ำมันพืชหรือน้ำมันมะกอกลงไป\n2.ผัดหัวหอมใหญ่ (Onion) และกระเทียม (Garlic) จนหอม\n3.ใส่พริกชี้ฟ้าแดง (Red bell pepper) และพริกขี้หนูแดง (Red chili) ลงไปผัดจนเข้ากัน\n4.ประมาณนาน 1-2 นาที ใส่พริกแกงเผ็ด (Red curry paste) ลงไปผัดกับพริกและหอม ให้ผสมเข้ากัน\n5.เพิ่มน้ำมะพร้าว (Coconut milk) ลงไป คนให้เข้ากันให้ดี\n6.เมื่อน้ำมะพร้าวเดือด ใส่น้ำตาลปี๊บ (Palm sugar) และใบมะกรูด (Kaffir lime leaves) เข้าไป\n7.ลดไฟให้น้อยลงและปรุงรสด้วยน้ำปลา (Fish sauce) และน้ำมะนาว (Lime juice) ตามความชอบ คนให้เข้ากัน\n8.เมื่อซอสเริ่มเข้มข้น ใส่หอยนางรมลงไป คนให้เข้ากันกับซอส\n9.ปิดฝาและต้มหอยนางรมจนเปิดเปลือก ประมาณ 5-7 นาที โดยคอยสังเกตการเปิดเปลือกของหอยนางรม\n10.เมื่อหอยนางรมเปิดเปลือกแล้ว ปิดไฟ\n11.ตักใส่ชามและโรยด้วยผักชีฝรั่งสด\n12.เสิร์ฟร้อนๆ รับประทานคู่กับข้าวหรือขนมปัง','\n',char(10)),'https://i.pinimg.com/originals/ba/e5/ef/bae5efa7580845c78dc17b212f2fab7e.jpg',1708151182);
    INSERT INTO all_menus VALUES(18,'Sticky Rice with Mango','[''mango'']',replace('วัตถุดิบ\n1. ข้าวเหนียว 1 ถ้วย (ประมาณ 200-250 กรัม)\n2. น้ำมะพร้าว 1 ถ้วย\n3. น้ำตาลปี๊บ 1/4 ถ้วย\n4. เกลือป่น 1/4 ช้อนชา\n5. มะม่วงสุกหั่นเป็นชิ้นเล็ก ๆ\n6. นมกะทิหรือน้ำกะทิข้น 1/2 ถ้วย\n7. น้ำตาลทราย 2-3 ช้อนโต๊ะ (ตามความหวานที่ต้องการ)\n8. เกลือ 1/4 ช้อนชา (หากต้องการเพิ่มรสเค็ม)\n\nวิธีทำ\n1. แช่ข้าวเหนียวในน้ำประมาณ 6-8 ชั่วโมง หรือค้างไว้ทั้งคืน\n2. หลังจากแช่แล้ว หยอดข้าวเหนียวลงในตะกร้าหรือถังน้ำต้มสุก ต้มให้น้ำเริ่มเดือด แล้วคลุกเคล้าให้ทั่ว\n3. ตอไป นำน้ำมะพร้าว น้ำตาลปี๊บ และเกลือป่นไปผสมกับข้าวเหนียวที่เตรียมไว้ คนให้เข้ากันแล้วค้างไว้ประมาณ 30 นาที\n4. พอข้าวเหนียวสุกแล้ว ใส่มะม่วงสุกลงไปผสมในข้าวเหนียว คนให้เข้ากันอีกครั้ง\n5. ผสมน้ำกะทิหรือนมกะทิข้น น้ำตาลทราย และเกลือในกระทะ นำไปต้มบนเตาไฟต่ำ ๆ จนน้ำตาลละลายและเริ่มขึ้นฤทธิ์ คนให้เข้ากันให้เรียบร้อย\n6. รับข้าวเหนียวมะม่วงที่สุกงอมมาวางในจาน ราดน้ำกะทิหรือนมกะทิข้นที่ผสมไว้ด้านบนข้าวเหนียว\n7. รับประทานคู่กับพริกผสมหรือผลไม้อื่น ๆ ตามชอบ','\n',char(10)),'https://hot-thai-kitchen.com/wp-content/uploads/2022/09/Mango-sticky-rice-blog.jpg',1708151563);
    INSERT INTO all_menus VALUES(19,'Mantis shrimp coconut curry','[''shrimp'', ''mantis shrimp'', ''lime'', ''coconut'', ''mussels'', ''cockle'', ''clams'', ''scallop'']',replace('ส่วนผสม:\n\n1.Mantis shrimp กั้ง (กุ้งหรือหอยเป็นตัวเลือกได้) - ปริมาณตามต้องการ\n2.น้ำมันพืช\n3.หัวหอมใหญ่ (Onion) - 1 หัว (สับ)\n4.กระเทียม (Garlic) - 4-5 กลีบ (สับ)\n5.พริกชี้ฟ้าแดง (Red chili) - ตามความชอบ (สับ)\n6.ใบมะกรูด (Kaffir lime leaves) - 3-4 ใบ\n7.ผงปรุงรสแกงเขียวหวาน (Green curry paste) - 2-3 ช้อนโต๊ะ\n8.น้ำมะพร้าว (Coconut milk) - 1-2 กระป๋อง\n9.น้ำปลา (Fish sauce) - 2 ช้อนโต๊ะ\n10.น้ำตาลปี๊บ (Palm sugar) - 1-2 ช้อนโต๊ะ\n11.น้ำมะนาว (Lime juice) - 1-2 ช้อนโต๊ะ\n12.ใบโหระพา (Thai basil leaves) - สำหรับโรยหรือใส่ลงไปในแกงตามต้องการ\n\nวิธีทำ:\n\n1.ล้าง Mantis shrimp ให้สะอาด ถ้าเป็นไปได้, คราบที่อยู่ด้านหน้าของมันควรถูออกให้สะอาดเพื่อลดกลิ่นเค็ม และหั่นเป็นชิ้นเล็กๆ โดยตัดตามลำตัวของมัน\n2.ตั้งกระทะที่กลับไฟกลาง และเทน้ำมันพืชลงไป รอให้ร้อน\n3.ใส่หัวหอมใหญ่ (Onion) และกระเทียม (Garlic) ลงไปผัดจนหอม\n4.เมื่อหอมจนกระเทียมสุกแล้ว ใส่พริกชี้ฟ้าแดง (Red chili) และใบมะกรูด (Kaffir lime leaves) ลงไปผัดต่อไป\n5.เมื่อมีกลิ่นหอมออกมา ใส่ผงปรุงรสแกงเขียวหวาน (Green curry paste) ลงไปผัดให้เข้ากันกับหอม กระเทียม พริก และใบมะกรูด\n6.เพิ่มน้ำมะพร้าว (Coconut milk) ลงไป คนให้เข้ากันกับเครื่องแกง และตั้งไฟให้เป็นไฟกลาง\n7.เมื่อน้ำมะพร้าวเริ่มเดือด ใส่ Mantis shrimp ลงไป\n8.ปรุงรสด้วยน้ำปลา (Fish sauce) และน้ำตาลปี๊บ (Palm sugar) ตามความชอบ\n9.ค่อยๆ ปรุงรสตามต้องการ รวมทั้งปรับความเผ็ดด้วยพริกชี้ฟ้าแดงหรือน้ำพริกเผาตามความชอบ\n10.เมื่อ Mantis shrimp สุกแล้วและเนื้ออ่อนลง ปิดไฟ และใส่ใบโหระพา (Thai basil leaves) ลงไป คนเบาๆ ให้เข้ากัน\n11.รสชาติและความเผ็ดสามารถปรับได้ตามชอบ\n12.เมื่อเสิร์ฟ, ใส่น้ำมะนาว (Lime juice) ลงไปเพื่อเพิ่มความหอมและรสชาติสดชื่น','\n',char(10)),'https://images.squarespace-cdn.com/content/v1/5ed13dd3465af021e2c1342b/1616045430660-4SOXRLHBJI4VQ1DPRJS8/IMG_9086.jpg',1708151621);
    INSERT INTO all_menus VALUES(20,'Chicken in Coconut Soup','[''chicken'', ''coconut'', ''lime'']',replace('วัตถุดิบ:\n1. เนื้อไก่ (หน้าอกหรือน่องไก่) หั่นบาง - 500 กรัม\n2. กะทิ - 2 ถ้วย\n3. น้ำซุปไก่ - 3 ถ้วย\n4. ข่าหั่นแว่น - 2 นิ้ว\n5. ตะไคร้หั่นแว่น - 2 ต้น\n6. ใบมะกรูด - 5 ใบ\n7. พริกขี้หนูสับ (ตามความเผ็ดต้องการ) - 2-3 เม็ด\n8. เห็ด (เห็ดนางฟ้าหรือเห็ดโคน) หั่นแว่น - 1 ถ้วย\n9. น้ำปลา - 3 ช้อนโต๊ะ\n10. น้ำมะนาว - จากมะนาว 2 ลูก\n11. น้ำตาล - 1 ช้อนโต๊ะ\n12. ใบผักชีซอย - สำหรับโรยหน้า\n13. ต้นหอมซอย - สำหรับโรยหน้า\n\nวิธีทำ:\n1. ในหม้อ, นำน้ำซุปไก่มาใส่ลงไปแล้วนำไปตั้งไฟอ่อนๆให้เดือด\n2. ใส่ข่า, ตะไคร้, และใบมะกรูดลงไปในน้ำซุป ควบคู่กันแล้วค่อยๆให้เดือดอีก 5 นาที เพื่อให้สารหอมรสจากสมุนไพรแพร่กระจาย\n3. ใส่เนื้อไก่ลงไปในหม้อ ต้มจนเนื้อไก่สุก\n4. เมื่อเนื้อไก่สุก, ใส่กะทิลงไป คนให้เข้ากัน\n5. ใส่เห็ดลงไปในหม้อและปรุงรสด้วยน้ำปลา, น้ำมะนาว และน้ำตาล ปรับรสตามชอบ\n6. ถ้าคุณชอบรสชาติเผ็ด ใส่พริกขี้หนูสับลงไป\n7. ปิดไฟและเสิร์ฟในชาม โรยให้ทั่วด้วยใบผักชีซอยและต้นหอมซอย','\n',char(10)),'https://img.taste.com.au/kVK7-ItR/taste/2016/11/thai-chicken-coconut-soup-82671-1.jpeg',1708152012);
    INSERT INTO all_menus VALUES(21,'Ham and cheese omelette','[''ham'', ''chicken egg'', ''chicken'', ''beef'']',replace('ส่วนผสม:\n\n1.ไข่ไก่ 3 ฟอง\n2.สับหมู (Ham) หรือเนื้อชิ้นของเนื้อสัตว์ที่ชอบ ปริมาณตามต้องการ\n3.ชีสชีส์ (Cheese) ประเภทที่ชอบ เช่น ชีสมูซาร์เรลล่า หรือชีสชิ้น ละเอียดหรือซอย\n4.น้ำมันหรือเนยสำหรับทอด\n\nวิธีทำ:\n\n1.ตั้งกระทะขนาดกลางขึ้นไป และใส่น้ำมันหรือเนยลงไป ให้กระทะร้อนพอดี\n2.พร้อมๆ กันนำไข่ไก่ 3 ฟองใส่ในชามและตีให้เข้ากัน\n3.เมื่อน้ำมันหรือเนยร้อนพอดี ใส่สับหมู (Ham) ลงไปทอด คอยคนจนสุก\n4.เมื่อสับหมูสุกแล้ว ใส่ไข่ไก่ที่ตีในชามลงไป คอยทอดจนไข่เริ่มกำลังแข็งตัว แต่ยังไม่แข็งแน่น\n5.เมื่อเห็นไข่เริ่มแข็งตัว ใส่ชีสชีส์ (Cheese) ลงไปบนผิวไข่ที่เป็นลูกพิเศษ และพับไข่ข้างๆขึ้นเพื่อให้ชีสล้อมตัวอยู่ตรงกลาง\n6.ปิดฝาของกระทะและคอยทอดต่อในเวลาอีก 1-2 นาที จนไข่สุกและชีสละลาย\n7.เมื่อไข่สุกและชีสละลายตามต้องการ ใช้พัพเข้ามาเบาๆลงบนไข่ แล้วพับตัวไข่ให้เป็นรูปกลม ๆ\n8.โรยเกลือและพริกไทยตามชอบ\n9.ตักออกมาใส่จาน และเสิร์ฟพร้อมผลไม้หรือสลัดสดตามความชอบ','\n',char(10)),'https://www.tasteofhome.com/wp-content/uploads/2018/01/Ham-and-Swiss-Omelet_exps90569_Webcard1306_07_2bC_RMS.jpg',1708152057);
    INSERT INTO all_menus VALUES(22,'Fried shrimp','[''shrimp'']',replace('วัตถุดิบ:\n1. กุ้งสด หรือ กุ้งแช่แข็ง 500 กรัม\n2. น้ำมันพืชสำหรับทอด\n3. กระเทียมสับ 2-3 ช้อนโต๊ะ\n4. พริกไทยป่น 1/2 ช้อนชา\n5. ผงปรุงรส หรือ น้ำมันหอย 1 ช้อนชา\n6. แป้งทอดกรอบ หรือ แป้งทอดสำเร็จรูป 1/2 ถ้วย\n7. ผักสด (ตัดและหั่นเต๋าเล็ก) - เช่น ผักชี, คื่นช่าย, หรือ ผักโขม\n\nวิธีทำ:\n1. ก่อนที่จะทอด ให้ล้างกุ้งให้สะอาดและตัดปลายขาออก (หากมี) เพื่อความสะดวกในการรับประทาน\n2. ตั้งกระทะให้ร้อนกลางไฟ และเทน้ำมันพืชลงไปพอครึ่งหน้ากะตุ้น\n3. ใส่กระเทียมสับลงไปทอดจนกระเทียมสุกและหอม จากนั้นใช้ที่ช้อนตักล้อเลียนตักกระเทียมออกจากกระทะ และหยิบมันให้ร้อนออก\n4. ตั้งไฟไปที่ไฟปานกลาง และใส่กุ้งลงไปทอด ทอดจนกุ้งสุกเหลือง และเนื้อกระด้างเริ่มชั่ง ประมาณ 2-3 นาที และให้กุ้งสุกมากขึ้นและกรอบเต็มที่ จากนั้นตักออกจากน้ำมันพืชและพักให้สะเด็ดน้ำมัน\n5. ตักกุ้งออกมาวางบนกระดาษชำระเพื่อดูน้ำมันเพิ่มเติม จากนั้นโรยผงปรุงรสหรือน้ำมันหอย และผงพริกไทยป่น\n6. โรยผักสดบนกุ้งทอดในจานเสิร์ฟ','\n',char(10)),'https://thecozycook.com/wp-content/uploads/2023/02/Fried-Shrimp-f.jpg',1708152158);
    INSERT INTO all_menus VALUES(23,'Clams and corn chowder','[''clams'']',replace('ส่วนผสม:\n\n1.หอยกาบ (Clams) - ปริมาณตามต้องการ (สดหรือแช่แข็ง)\n2.มันฝรั่ง (Potatoes) - 2-3 หัว (หั่นเป็นชิ้นเล็กๆ)\n3.ข้าวโพด (Corn) - 1-2 ข้าวโพด (หรือใช้ข้าวโพดอ่อนหรือแห้ง)\n4.หัวหอมใหญ่ (Onion) - 1 หัว (ซอย)\n5.กระเทียม (Garlic) - 2-3 กลีบ (สับ)\n6.เบคอน (Bacon) - 4-6 แผ่น (สับ)\n7.น้ำซุปหรือน้ำซุปหอยนกาบ (Chicken broth or Clam broth) - ปริมาณ 4 ถ้วย\n8.นมข้นจืด (Heavy cream) - 1 ถ้วย\n9.เกลือ (Salt) และพริกไทย (Pepper) ตามความชอบ\nส่วนผสมเสริมเพิ่มเติม: พริกหวานหรือพริกแห้งสำหรับใส่ตามชอบ, ผักสดสำหรับเสิร์ฟ (ตามต้องการ)\n\nวิธีทำ:\n\n1.กระทะร้อนและทอดเบคอนให้กรอบ จากนั้นนำเบคอนออกจากกระทะและวางไว้ให้สะเด็ดน้ำมัน\n2.ในกระทะที่มีน้ำมันจากเบคอนทอด ใส่หัวหอมใหญ่ (Onion) และกระเทียม (Garlic) ลงไปผัดจนหอม\n3.เมื่อหอมหอมแล้ว ใส่มันฝรั่ง (Potatoes) และข้าวโพด (Corn) ลงไปผัดรวมกัน\n4.เพิ่มน้ำซุปหรือน้ำซุปหอยนางรม (Chicken broth or Clam broth) ลงไปในหม้อ คนให้เข้ากันและนำสู่การเดือด\n5.เมื่อน้ำเดือด ลดไฟให้เป็นไฟอ่อนๆ และค่อยๆ ต้มให้มันฝรั่งนุ่ม\n6.เมื่อมันฝรั่งเริ่มนุ่มแล้ว ใส่หอยกาบ(Clams) ลงไป และต้มให้หอยนางรมเปิด\n7.เพิ่มนมข้นจืด (Heavy cream) เข้าไป คนให้เข้ากันและต้มอีกสักครู่\n8.ปรุงรสด้วยเกลือและพริกไทยตามความชอบ\n9.เมื่อรสชาติพอใจ ตักใส่ถ้วย โรยเบคอนทอดที่สะเด็ดน้ำมันไว้บนบน และเสิร์ฟร้อนๆ\n10.ตกแต่งด้วยพริกหวานหรือพริกแห้ง (ตามชอบ) และผักสดสำหรับเสิร์ฟ','\n',char(10)),'https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&rect=0%2C504%2C2000%2C1504&poi=[900%2C940]&w=2000&h=1000&url=https:%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F44%2F2021%2F06%2F09%2Fclam-and-corn-chowder.jpg',1708153221);
    INSERT INTO all_menus VALUES(24,'Crab meat with yellow curry','[''crab'']',replace('วัตถุดิบ:\n1. เนื้อปู (ปูม้าหรือปูอัด) - 500 กรัม (สามารถใช้ปูแล้วแยกเนื้อได้ด้วย)\n2. พริกแกงเหลือง - 3 ช้อนโต๊ะ\n3. กะทิ - 2 ถ้วย\n4. น้ำปลา - 2 ช้อนโต๊ะ\n5. น้ำตาลปาล์มหรือน้ำตาลทราย - 1 ช้อนโต๊ะ\n6. ใบมะกรูดซอย - 4-5 ใบ\n7. ใบโบราณ - ½ ถ้วย\n8. พริกแดง (ซอย) - 1 เม็ด (ถ้าต้องการใช้เป็นตกแต่ง)\n9. น้ำมันพืช - 2 ช้อนโต๊ะ\n10. น้ำ - 1 ถ้วย\n11. เกลือตามรสชาติ\n\nขั้นตอนการทำ:\n1. ในกระทะ, เริ่มทอดพริกแกงเหลืองในน้ำมันพืชที่ความร้อนกลางๆ จนหอม\n2. เพิ่มกะทิลงไปในกระทะ คนให้เข้ากันกับพริกแกงเหลือง\n3. เติมน้ำและเปลี่ยนไฟให้เป็นไฟอ่อน นำมาต้มให้เดือดอีกครั้ง\n4. ใส่น้ำปลา, น้ำตาลปาล์ม, ใบมะกรูดซอย, และใบโบราณลงไปในน้ำหม้อ คนให้เข้ากัน\n5. ปรุงรสด้วยเกลือตามรสชาติและความเผ็ดตามต้องการ\n6. เมื่อน้ำเดือดและมีรสชาติที่ต้องการแล้ว ใส่เนื้อปูลงไป คนให้เข้ากันเบาๆ\n7. ต้มต่ออีก 5-7 นาที หรือจนเนื้อปูสุก\n8. เมื่อเสร็จสิ้น, ตักแกงกะทิปูใส่ในชาม โรยใบโหราณและพริกแดง (ถ้าใช้) เพื่อตกแต่ง\n9. เสิร์ฟร้อน รับประทานคู่กับข้าวสวย หรือขนมปังกรอบ','\n',char(10)),'https://www.thebigchilli.com/uploads/1/2/2/0/12204015/image001_3_orig.jpg',1708153530);
    INSERT INTO all_menus VALUES(25,'Stir-fried Shrimp','[''shrimp'']',replace('วัตถุดิบ:\n1. กุ้ง (ล้างและปอกเปลือก) - 200 กรัม\n2. ผักตามชอบ (เช่น กะหล่ำปลี, กะหล่ำดอก, ถั่วฝักยาว, คะน้า, บล็อคโคลี, หอมหัวใหญ่, แครอท) - ประมาณ 3 ถ้วย\n3. กระเทียมสับ - 2 ช้อนโต๊ะ\n4. ซอสหอยนางรม - 1 ช้อนโต๊ะ\n5. ซีอิ๊วขาว - 1 ช้อนโต๊ะ\n6. น้ำตาลทราย - 1/2 ช้อนชา\n7. น้ำมันพืชสำหรับทอด - 2 ช้อนโต๊ะ\n8. น้ำ - 2 ช้อนโต๊ะ\n9. เกลือและพริกไทยป่นตามชอบ\n\nวิธีทำ:\n1. ตั้งกระทะทอดให้ร้อน ใส่น้ำมันพืชลงไป 1 ช้อนโต๊ะ และนำกระเทียมสับลงไปผัดจนหอม\n2. เพิ่มกุ้งลงไปผัดจนสุก จากนั้นตักออกให้สะเด็ดน้ำมัน และวางไว้ในจานข้างๆ\n3. ใส่ผักลงไปในกระทะและผัดจนเนื้อนุ่ม\n4. ปรุงรสด้วยซอสหอยนางรม, ซีอิ๊วขาว, น้ำตาลทราย, เกลือ และพริกไทยป่นตามชอบ คนให้เข้ากัน\n5. เทน้ำลงไปและคนผักให้เข้ากันกับซอส\n6. นำกุ้งที่ผัดสุกแล้วยัดลงไปผัดรวมกับผัก คนให้เข้ากัน\n7. เมื่อผักสุกและกุ้งสุกเสร็จสิ้น ปิดไฟ\n8. ตักใส่จานและเสิร์ฟร้อนๆ คู่กับข้าวสวย','\n',char(10)),'https://healthyrecipesblogs.com/wp-content/uploads/2021/03/shrimp-stir-fry-featured-2022.jpg',1708153664);
    INSERT INTO all_menus VALUES(26,'Mussels in Thai green curry ','[''mussels'']',replace('วัตถุดิบ:\n\n1.หอยแมลงภู่ (Mussels) - ปริมาณตามต้องการ (ล้างให้สะอาด)\n2.น้ำมันหรือเนยสำหรับผัด\n3.น้ำกะทิ (Coconut milk) - 1 ถ้วย\n4.ซอสแกงเขียวหวาน (Thai green curry paste) - 2-3 ช้อนโต๊ะ (ตามความเผ็ดที่ต้องการ)\n5.ใบมะกรูด (Kaffir lime leaves) - 2-3 ใบ\n6.ใบโหระพา (Thai basil leaves) - สำหรับตกแต่ง (ตามความชอบ)\n7.น้ำตาลปี๊บ (Palm sugar) - 1-2 ช้อนชา (ตามความหวานที่ต้องการ)\n8.น้ำปลา (Fish sauce) - 2 ช้อนโต๊ะ (ตามความเค็มที่ต้องการ)\n9.พริกชี้ฟ้าสดหรือพริกขี้หนู (Fresh chili or bird''s eye chili) - ตามความเผ็ดที่ต้องการ\n10.ใบมะกรูดสด (Fresh kaffir lime leaves) - สำหรับตกแต่ง\n11.พริกไทยดำ (Black pepper) - ตามความชอบ\n\nขั้นตอน:\n\n1.ตั้งกระทะหรือหม้อทองและเทน้ำมันหรือเนยลงไป รอให้ร้อน\n2.เมื่อน้ำมันหรือเนยร้อนแล้ว ใส่ซอสแกงเขียวหวานลงไป และคนให้เข้ากันกับน้ำมันหรือเนย\n3.เพิ่มน้ำกะทิลงไป คนให้เข้ากันและคลุกเคล้าให้เข้ากันกับซอสแกงเขียวหวาน\n4.เมื่อเดือด ใส่หอยแมลงภู่ลงไป และคนให้เข้ากันกับซอสแกงเขียวหวานและน้ำกะทิ\n5.เพิ่มใบมะกรูดและใบโหระพาลงไป และคนให้เข้ากันกับซอส\n6.เพิ่มน้ำตาลปี๊บและน้ำปลาลงไป คนให้เข้ากัน\n7.ปรุงรสด้วยพริกไทยดำตามความชอบ\n8.เมื่อหอยแมลงภู่เปิดสุดแล้ว ปิดไฟ และตรวจสอบรสชาติ ปรับตามความชอบ\n9.ตักใส่จาน และตกแต่งด้วยใบมะกรูดสดและพริกขี้หนูหรือพริกชี้ฟ้าสด\n10.เสิร์ฟร้อนๆ คู่กับข้าวสวยร้อน หรือขนมปังกระเทียมปิ้ง','\n',char(10)),'https://twosleevers.com/wp-content/uploads/2020/04/Thai-green-curry-mussels-sideways-900x680-1.jpg',1708153793);
    INSERT INTO all_menus VALUES(27,'Salmon teriyaki with rice','[''salmon'']',replace('วัตถุดิบ:\n\n1.ปลาแซลมอน (Salmon fillets) - 2 ชิ้น\n2.น้ำตาลทราย - 2 ช้อนโต๊ะ\n3.ซอสถั่วเหลือง (Soy sauce) - 1/4 ถ้วย\n4.ซอสทริยากิ (Teriyaki sauce) - 1/4 ถ้วย\n5.น้ำมันพืช (Vegetable oil) - 1 ช้อนโต๊ะ\n6.กระเทียม (Garlic) - 2-3 กลีบ (สับ)\n7.ข้าว (Rice) - ปริมาณตามต้องการ\n8.น้ำ (Water) - สำหรับสุกข้าว\n9.ผักต่าง ๆ เสิร์ฟร่วม (Optional)\n\nขั้นตอน:\n\n1.ทำน้ำซอส Teriyaki: ผสมน้ำตาลทราย, ซอสถั่วเหลือง, และซอสทริยากิในชาม คนให้เข้ากันและเก็บไว้\n2.อบปลาแซลมอน: ตั้งกระทะให้ร้อนและใส่น้ำมันพืชลงไป พอน้ำมันร้อนแล้วใส่ปลาแซลมอนลงไปทอดทั้งสองด้านจนสุก จนปลาเปลี่ยนสีและเนื้อปลาเป็นเนื้อสีชมพูอ่อน จากนั้นตักขึ้นแล้ววางไว้ในจานสำหรับเสิร์ฟ\n3.ทำน้ำซุปข้าว: นำข้าวไปล้างให้สะอาด ใส่น้ำลงไปและต้มข้าวให้สุก\n4.ทำซอส Teriyaki: ตั้งกระทะให้ร้อน ใส่กระเทียมสับลงไปผัดจนหอม จากนั้นเทน้ำซอส Teriyaki ที่ผสมไว้ลงไป คนให้เข้ากัน พอซอสเริ่มเดือดกลิ่นหอมก็ปิดไฟ\n5.รับประทาน: ตักข้าวใส่ในจาน จัดปลาแซลมอนลงไปด้านบน แล้วค่อยๆ เทซอส Teriyaki ที่เตรียมไว้ และผักต่าง ๆ ที่ต้องการไปด้านข้างของจาน พร้อมเสิร์ฟทันที','\n',char(10)),'https://th.bing.com/th/id/R.f2600083d9e68b3b070a6beddb554863?rik=vCsz%2fQ32fh8aSg&pid=ImgRaw&r=0',1708154067);
    INSERT INTO all_menus VALUES(28,'Clear Soup with Pork','[''beef'']',replace('วัตถุดิบ: \n1. น้ำซุปไก่หรือผัก - 4 ถ้วย\n2. น้ำ - 2 ถ้วย\n3. แครอท หั่นเป็นแว่น - 1 ลูกเล็ก\n4. ต้นหอมซอย - 1 ต้น\n5. หอมใหญ่ซอย - 1 หัว\n6. กระเทียมสับ - 2 กลีบ\n7. เกลือ - 1 ช้อนชา\n8. พริกไทยดำป่น - 1/2 ช้อนชา\n9. หมูสับ - 200 กรัม\n10. ผักชีสับ - เพื่อใช้ในการตกแต่ง\n\nขั้นตอน:\n1. นำน้ำซุปไก่หรือผักมาใส่ในหม้อใหญ่ และใส่น้ำลงไป ให้เดือดบนไฟปานกลาง\n2. เพิ่มแครอท, ต้นหอม, หอมใหญ่, และกระเทียมลงไปในหม้อ\n3. ลดไฟลงเป็นไฟอ่อน ให้ซุปค่อยๆ เดือดจนผักสุก\n4. ปรุงรสด้วยเกลือและพริกไทยดำ ตามความชอบ\n5. เมื่อสุกแล้ว ใส่หมูสับลงไปในหม้อ คอยคนให้เข้ากัน\n6. ตั้งเวลาให้หมูสุกและซุปเข้ากัน ประมาณ 10-15 นาที\n7. เมื่อสุกแล้ว ตักใส่ชาม และโรยด้วยผักชีสับ','\n',char(10)),'https://i.pinimg.com/originals/1a/dc/9e/1adc9e4ad6e0f11fa7ce1290946b2d76.jpg',1708154511);
    INSERT INTO all_menus VALUES(29,'Apple cinnamon oatmeal','[''apple'']',replace('ส่วนผสม:\n\n1.1/2 ถ้วยโอ๊ต (Oats)\n2.1 ถ้วยน้ำ\n3.1 แอปเปิ้ลขนาดกลาง (และผลไม้เพิ่มเติมตามชอบ)\n4.1/2 ช้อนชาอบเชย (Cinnamon powder)\n5.1 ช้อนชาน้ำผึ้งหรือน้ำตาลทราย (Optional)\n6.1/4 ช้อนชาเกลือ\n\nวิธีทำ:\n\n1.ซึ่งแผ่นแอปเปิ้ลเป็นชิ้นเล็กๆ และเอาเมล็ดออก\n2.นำโอ๊ต น้ำ แอปเปิ้ล อบเชย และเกลือใส่ลงในหม้อที่ใช้ต้ม\n3.เปิดเครื่องต้มหรือเตาแก๊สให้ร้อนพอความสุกแล้วลดไฟลงไปประมาณไฟกลาง ๆ ค่อยๆ คนให้เข้ากัน\n4.คอยคนเป็นระยะๆ และต้มจนโอ๊ตเริ่มเนียนและนุ่ม ประมาณ 5-7 นาที หรือตามความสุกที่ต้องการ\n5.เมื่อโอ๊ตสุกพอ ปิดไฟและเติมน้ำผึ้งหรือน้ำตาลทรายตามชอบ คนให้เข้ากัน\n6.ใส่โอ๊ตลงในถ้วย เสิร์ฟพร้อมผลไม้หรือผลไม้แช่แข็งเพิ่มเติมตามชอบ','\n',char(10)),'https://th.bing.com/th/id/OIP.wVr5O4O0ZA6acokxqWDaYwAAAA?rs=1&pid=ImgDetMain',1708154514);
    INSERT INTO all_menus VALUES(30,'Crab bisque soup','[''crab'']',replace('วัตถุดิบ:\n\n1.ปูสด 2 ตัว (ประมาณ 500 กรัม)\n2.น้ำมันมะกอก 3 ช้อนโต๊ะ\n3.หอมใหญ่ 1 หัว สับ\n4.กระเทียม 4 กลีบ สับ\n5.แป้งสาลี 3 ช้อนโต๊ะ\n6.นมข้นจืด 2 ถ้วย\n7.น้ำปูหรือน้ำสต็อก (หรือน้ำซุปไก่) 4 ถ้วย\n8.ไข่แดง 1 ฟอง\n9.น้ำมันมะกอกสำหรับผสมกับไข่แดง 1 ช้อนโต๊ะ\n10.ผงปรุงรส สำหรับปรุงรสตามชอบ (เกลือ พริกไทย ฯลฯ)\n11.น้ำมันมะกอก สำหรับผัด\n\nขั้นตอน:\n\n1.ตั้งหม้อใหญ่ที่กลางไฟ ใส่น้ำมันมะกอกลงไป รอให้ร้อนแล้วใส่หอมใหญ่และกระเทียมลงไปผัดจนหอม\n2.หลังจากนั้นใส่ปูลงไปผัดพอสุก ไม่ต้องผัดนานเพราะจะสูญเสียความนุ่ม\n3.เมื่อปูสุกแล้ว ใส่แป้งสาลีลงไปคลุกเคล้าให้ทั่วกัน\n4.เติมนมข้นจืดลงไปคนให้เข้ากัน\n5.เติมน้ำปูหรือน้ำสต็อกลงไปคนให้เข้ากัน รอจนน้ำซุปเดือด และให้เคลือบปู\n6.ใส่ผงปรุงรสตามชอบลงไป คนให้เข้ากัน ปรับรสตามชอบ\n7.เสร็จแล้วปิดไฟ\n8.ในขณะที่รอให้ผงปรุงรสลงเย็นลง ให้เตรียมน้ำมันมะกอกใส่ถ้วยกลาง แล้วตีไข่แดงเข้ากับน้ำมันมะกอกจนเข้ากันเป็นน้ำเทียม\n9.ค่อยๆ เติมน้ำซุปลงไปในน้ำเทียมไข่ พอน้ำซุปมีอุณหภูมิเย็นลงแล้ว ค่อยๆ เติมน้ำซุปเข้าไปให้ทั่วถ้วย\n10.ปรุงรสตามชอบ จัดเสิร์ฟร้อนๆ พร้อมกับขนมปังกรอบหรือแต่งแล้วด้วยความพองหรือถั่วผักตามชอบ','\n',char(10)),'https://littlespicejar.com/wp-content/uploads/2018/03/Blushing-Tomato-Crab-Bisque-4.jpg',1708154698);
    INSERT INTO all_menus VALUES(31,'Panaeng Curry with Pork','[''beef'', ''chicken'']',replace('วัตถุดิบ:\n1. เนื้อหมูหั่นชิ้น - 500 กรัม\n2. พระแนงเครื่องสำเร็จ - 2-3 ช้อนโต๊ะ\n3. กะทิ - 1 ถ้วย\n4. น้ำตาลปี๊บ - 2 ช้อนโต๊ะ\n5. น้ำมันพืช - 2 ช้อนโต๊ะ\n6. ใบมะกรูดซอย - 2-3 ใบ (สำหรับตกแต่ง)\n\nวิธีทำ:\n1. ตั้งกระทะใส่น้ำมันพืชและเปิดไฟปานกลาง พอน้ำมันร้อนใส่พระแนงเครื่องสำเร็จลงไปผัดจนหอม\n2. เทกะทิลงไปในกระทะ คนให้เข้ากัน\n3. เมื่อกะทิเดือด ใส่เนื้อหมูลงไปผัดจนสุก\n4. ปรุงรสด้วยน้ำตาลปี๊บตามความชอบ คนให้เข้ากัน\n5. ปิดไฟและตักพระแนงหมูใส่จาน โรยใบมะกรูดซอยลงไปบนพระแนงหมู\n6. เสิร์ฟพระแนงหมูร้อนๆ คู่กับข้าวสวย หรือข้าวเหนียว','\n',char(10)),'https://www.mythaicooking.com/wp-content/uploads/2018/10/thai-pork-curry.jpg',1708154989);
    COMMIT;
    `);
  }
}

export default DB;
