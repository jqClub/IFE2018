 var id = 0
            
var CreatCingleFun = function(fu) {
    var result = null
    return function() {
        if(!result) {
            result = fu.apply(this, arguments)
        }
        return result
    }
}

class CreatCingleCase {
    constructor() {
        //方式1：创建一个单例的类，然后让下面去继承他
        if(!CreatCingleCase.instan) {
            CreatCingleCase.instan = this
        }
        return CreatCingleCase.instan
    }
//*****************************************
    //方式2：使用静态来创建单例
    static singleCase(obj) {
        if(!this.instan) {
           this.instan = new this(obj)
        }

        return this.instan
    }
}

//使用的是ES6方法
class Restaurant extends CreatCingleCase {
    constructor(obj) {
//                构造函数中通过super()调用父类构造函数，如果有super方法，需要时构造函数中第一个执行的语句，this关键字在调用super之后才可用。
        super()

        this.cash = obj.cash
        this.seats = obj.seats 
        this.staff = obj.staff  //职员的列表数组
        
        this.foods = obj.foods || [] //所有已点的餐
    }
    hire(obj) {
        var that = this
        log('招聘职员', obj)
        that.staff.push(obj)
    }
    fire(obj) {
        var that = this
        log('解雇职员', obj)
        var staff = that.staff
        var len = staff.length
        var findIndex = -1
        for(var i = 0; i < len; i++) {
            var a = staff[i]
            if(a.id == obj.id) {
                //说明找到了，删除
                findIndex = i
            }
        }

        if(findIndex == -1) {
            //说明没有
            return '没有找到'
        } else {
            //说明有,删除
            staff.splice(findIndex, 1)
            return '删除成功'
        }
    }
    //关于用户点的菜
    foodAbout(obj) {
        var foods = this.foods
        var food = obj.food 
        if(obj.type == 'add') {
            //新增菜品
            foods.push(food)
            log('-餐厅-用户点的菜-新增-', foods)
        } else {
            var len = foods.length
            //删除菜品
            for(var i = 0; i < len; i++) {
                if(foods[i].name == food.name) {
                    foods.splice(i, 1)
                    break
                }
            }
            log('-餐厅-用户点的菜-删除-', foods)
        }
        
    }
    //使用静态new的方法，而不使用new
    static new(obj) {
        let i = new this(obj)
        return i
    }
}

//职员类：
//属性：ID，姓名，工资
//方法：完成一次工作
class Worker  {
    constructor(obj) {
//    //通过super()来继承父类
//    super()

        this.id = id++
        this.name = obj.name
        this.salary = obj.salary
    }
    finishJob() {
        log('完成一次工作')
    }
    //使用静态new的方法，而不使用new
    static new(obj) {
        let i = new this(obj)
        return i
    }
}

//服务员类，继承自职员
//完成一次工作：如果参数是个数组，则记录客人点菜，如果参数不是数组则是上菜行为
class Waiter extends Worker{
    constructor(name, salary) {
//                  构造函数中通过super()调用父类构造函数，如果有super方法，需要时构造函数中第一个执行的语句，this关键字在调用super之后才可用。
        super({
            name,
            salary,
        })

        //方式1：创建一个单例的类，然后让下面去继承他
        if(!Waiter.instan) {
            Waiter.instan = this
        }
        return Waiter.instan
    }
    finishJob(data, ifeRestaurant) {
        if(Array.isArray(data)) {
            //说明是点菜
            log('如果参数是个数组，则记录客人点菜')
            var len = data.length
            //for循环插入数据
            for(var i = 0; i < len; i++) {
                var food = data[i]
                ifeRestaurant.foodAbout({
                   type: 'add',
                   food: food
                })
            }
        } else {
            //如果参数不是数组则是上菜行为.说明是上菜
            log('-服务员上菜了-', data.name)
        }
    }
}

//厨师类，继承自职员
//完成一次工作：烹饪出菜品
class Cook extends Worker{
    constructor(name, salary) {
//      构造函数中通过super()调用父类构造函数，如果有super方法，需要时构造函数中第一个执行的语句，this关键字在调用super之后才可用。
        super({
            name,
            salary,
        })

        //方式1：创建一个单例的类，然后让下面去继承他
        if(!Cook.instan) {
            Cook.instan = this
        }
        return Cook.instan
    }
//  finishJob(ifeRestaurant, fun) {
//      var foods = ifeRestaurant.foods
//      for(var i = 0; i < foods.length; i++) {
//          let food = foods[i]
//          let name = food.name
//          log('-烹饪出菜品-', name)
//          fun(food)
//      }
//  }
    finishOne(food) {
        return new Promise(function (resolve, reject) {
            var name = food.name
            log('-烹饪出菜品-', name)
            setTimeout(function() {
                resolve(food)
            }, 500);
        });
    }
    finishJob(ifeRestaurant) {
        var result = []
        var foods = ifeRestaurant.foods
        for(var i = 0; i < foods.length; i++) {
            var food = foods[i]
            result.push(this.finishOne(food))
        }
        return result
    }
}

//顾客类
//方法：点菜，吃
class Customer{
    constructor(obj) {

    }
    order(foods) {
        for(var i = 0; i < foods.length; i++) {
            var food = foods[i]
            log('-用户点菜-', food.name)
        }
    }
    eat(food) {
        log('-用户吃-', food.name)
    }
}

//菜品类
//属性：名字、烹饪成本、价格
class Food{
    constructor(obj) {
        this.id = obj.id
        this.name = obj.name
        this.cost = obj.cost
        this.expenditure = obj.expenditure
    }
}